/**
Patrols in a circle until it sees the player, in which case it will chase the player while they are in range.
**/
#pragma strict
public enum AIState {
Patrolling = 0,
Chasing = 1,
}
public var patrolWayPoints : Transform[]; // An array of transforms for the patrol route.
public static final var CHASE_LIMIT = 8;
public static final var RUN_SPEED = 5;
public var guiScript: GUI_Script;

private var target : Transform; //the enemy's target
private var moveSpeed = RUN_SPEED; //move speed
private var rotationSpeed = 3; //speed of turning
private var myTransform : Transform; //current transform data of this enemy
private var my_animator:Animator;
private var wayPointIndex : int;// A counter for the way point array.
private var state: AIState;

function Awake() {
    myTransform = transform; //cache transform data for easy access/performance
    my_animator = GetComponent(Animator);

}

function Start() {
    target = GameObject.FindWithTag("Player").transform; //target the player

}

function Update() {
    if(playerInRange()){
    	state = AIState.Chasing;
    	Chase();
    }else{	
    state = AIState.Patrolling;
    Patrol();
    }
    my_animator.SetFloat("Speed", moveSpeed);


}

function Chase() {
    //rotate to look at the player
    myTransform.rotation = Quaternion.Slerp(myTransform.rotation,
        Quaternion.LookRotation(target.position - myTransform.position), rotationSpeed * Time.deltaTime);

        if(atLocation(target.position)){
    	moveSpeed = 0;
    	guiScript.removeItem(true);
    }else{
    	 moveSpeed = 3;
            //move towards the player
        myTransform.position += myTransform.forward * moveSpeed * Time.deltaTime;
    }

}

function Patrol() {
	//Move to the next position if we're at our target one.
    if(atLocation(patrolWayPoints[wayPointIndex].position)){
    if (wayPointIndex == patrolWayPoints.Length - 1) {
        wayPointIndex = 0;
    } else {
        wayPointIndex++;
    }
    }
    var nextWayPointPosition = patrolWayPoints[wayPointIndex].position;
    moveSpeed = 3;
    myTransform.rotation = Quaternion.Slerp(myTransform.rotation,
        Quaternion.LookRotation(nextWayPointPosition - myTransform.position), rotationSpeed * Time.deltaTime);
    myTransform.position += myTransform.forward * moveSpeed * Time.deltaTime;

}

function atLocation(targetPosition: Vector3){
    var transformVector = myTransform.position - targetPosition;
    return Mathf.Abs(transformVector.x) < 0.4 && Mathf.Abs(transformVector.z) < 0.4;

}

function playerInRange(){
    var transformVector = myTransform.position - target.position;
        return Mathf.Abs(transformVector.x) < CHASE_LIMIT && Mathf.Abs(transformVector.z) < CHASE_LIMIT;

}

function currentState(){
return state;
}