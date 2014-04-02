var target : Transform; //the enemy's target
var moveSpeed = 3; //move speed
var rotationSpeed = 3; //speed of turning
 
var myTransform : Transform; //current transform data of this enemy
 
function Awake()
{
    myTransform = transform; //cache transform data for easy access/performance

}
 
function Start()
{
     target = GameObject.FindWithTag("Player").transform; //target the player
 
}
 
function Update () {
    //rotate to look at the player
	var lookDirection = target.position - myTransform.position;
	myTransform.rotation = Quaternion.Slerp(myTransform.rotation,
	Quaternion.LookRotation(lookDirection), rotationSpeed*Time.deltaTime);
	//Move towards the player
	myTransform.position += myTransform.forward * moveSpeed * Time.deltaTime; 
 
}