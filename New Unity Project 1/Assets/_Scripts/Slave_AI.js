﻿/** 
The Slave hangs around in the middle of the patrol circle until the master moves, and then it takes over the patrol.
It will chase the player when they come close (whether patrolling or not).
**/
#pragma strict
public var origin: Transform;
public var masterAI: Master_AI;

private var target : Transform; //the enemy's target
private var moveSpeed = Master_AI.RUN_SPEED; //move speed
private var rotationSpeed = 3; //speed of turning
private var myTransform : Transform; //current transform data of this enemy
private var my_animator:Animator;
private var wayPointIndex : int;// A counter for the way point array.

function Awake() {
    myTransform = transform; //cache transform data for easy access/performance
    my_animator = GetComponent(Animator);

}

function Start() {
    target = GameObject.FindWithTag("Player").transform; //target the player

}

function Update() {
if(ObstacleInWay()){
 moveSpeed = 0;
}else{
    var masterState = masterAI.currentState();
    if (masterState == AIState.Patrolling) {
        if (playerInRange()) {
            Chase();
        } else {
            ReturnToOrigin();
        }
    } else {
	if(playerInRange()){
	    Chase();
    	} else {    
            Patrol();
        }
    }
}
    my_animator.SetFloat("Speed", moveSpeed);


}

function Chase() {
    //rotate to look at the player
    myTransform.rotation = Quaternion.Slerp(myTransform.rotation,
        Quaternion.LookRotation(target.position - myTransform.position), rotationSpeed * Time.deltaTime);

    if (hittingPlayer()) {
        masterAI.guiScript.removeItem(true);
        moveSpeed = 0;
    } else {
        moveSpeed = Master_AI.RUN_SPEED;
        //move towards the player
        myTransform.position += myTransform.forward * moveSpeed * Time.deltaTime;
    }

}

function Patrol() {
    //Move to the next position if we're at our target one.
    if (atLocation(masterAI.patrolWayPoints[wayPointIndex].position,0.4)) {
        if (wayPointIndex == masterAI.patrolWayPoints.Length - 1) {
            wayPointIndex = 0;
        } else {
            wayPointIndex++;
        }
    }
    var nextWayPointPosition = masterAI.patrolWayPoints[wayPointIndex].position;
        moveSpeed = Master_AI.RUN_SPEED;
    myTransform.rotation = Quaternion.Slerp(myTransform.rotation,
        Quaternion.LookRotation(nextWayPointPosition - myTransform.position), rotationSpeed * Time.deltaTime);
    myTransform.position += myTransform.forward * moveSpeed * Time.deltaTime;

}

function ReturnToOrigin() {
    if (atLocation(origin.position,0.4)) {
        moveSpeed = 0;
    } else {
        myTransform.rotation = Quaternion.Slerp(myTransform.rotation,
            Quaternion.LookRotation(origin.position - myTransform.position), rotationSpeed * Time.deltaTime);
        myTransform.position += myTransform.forward * moveSpeed * Time.deltaTime;
        moveSpeed = Master_AI.RUN_SPEED;
    }

}

function atLocation(targetPosition: Vector3,distance: float){
    var transformVector = myTransform.position - targetPosition;
    return Mathf.Abs(transformVector.x) < distance && Mathf.Abs(transformVector.z) < distance;

}

function playerInRange(){
return atLocation(target.position, Master_AI.CHASE_LIMIT);
}
function hittingPlayer(){
return atLocation(target.position, 0.4);

}

function ObstacleInWay(){
	var obstacles : GameObject[] = GameObject.FindGameObjectsWithTag("Obstacle");
	for(var obstacle: GameObject in obstacles){
		Debug.Log(obstacle);
		if(atLocation(obstacle.transform.position,2)){
		return true;
		}
	}
	return false;

}