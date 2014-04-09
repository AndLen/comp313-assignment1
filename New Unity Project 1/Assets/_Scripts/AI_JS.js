var target : Transform; //the enemy's target
var moveSpeed = 3; //move speed
var rotationSpeed = 3; //speed of turning
 
var myTransform : Transform; //current transform data of this enemy
var my_animator:Animator;
 
function Awake()
{
    myTransform = transform; //cache transform data for easy access/performance
    my_animator = GetComponent(Animator);

}
 
function Start()
{
     target = GameObject.FindWithTag("Player").transform; //target the player
 
}
 
function Update () {
    //rotate to look at the player
    
    myTransform.rotation = Quaternion.Slerp(myTransform.rotation,
    Quaternion.LookRotation(target.position - myTransform.position), rotationSpeed*Time.deltaTime);
 
    //move towards the player
	//myTransform.forward.y = 0;
	var transformVector = myTransform.position - target.position;
	if(Mathf.Abs(transformVector.x) > 0.4 && Mathf.Abs(transformVector.z) > 0.4){
    myTransform.position += myTransform.forward * moveSpeed * Time.deltaTime;
    my_animator.SetFloat("Speed",moveSpeed); 
	
}else{
    my_animator.SetFloat("Speed",0); 
	
}
	
}