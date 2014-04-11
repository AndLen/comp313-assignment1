#pragma strict
// The gravity for the character
private var gravity = 20.0;
private var weight = 6;
private var pushPower = 1;
var guiScript: GUI_Script;

var hiddenObjects = new Array();
function Start () {
}

function Update () {

}

function OnControllerColliderHit (hit : ControllerColliderHit )
{
//  Debug.DrawRay(hit.point, hit.normal);
    if (hit.moveDirection.y > 0.01) 
        return;
        
        var body = hit.collider.attachedRigidbody;
        var force = Vector3.zero;
        //no rigidbody
        if (body == null || body.isKinematic) 
        {
            return;
        }
        //gravity and weight pushes things down
        //push and speed is used to move things in other directions
        if (hit.moveDirection.y < -0.3) {
            force =  new Vector3 (0.0f, -0.5f, 0.0f) * gravity * weight;
        } 
        else {
            force = hit.controller.velocity * pushPower;
        }
        //add force
        body.AddForceAtPosition (force, hit.point);
}

function OnTriggerEnter (other : Collider) {
        if(other.gameObject.tag == "PickUp"){
            other.gameObject.SetActive(false);
            hiddenObjects.Push(other.gameObject);
            guiScript.updateScore(1);

        }
}

function unhidePickup(){
    if(hiddenObjects.length > 0){
    var unhide : GameObject = hiddenObjects.Pop();
    var playerObject = GameObject.Find("Player");
    var playerPos:Vector3 = playerObject.transform.position;
    unhide.transform.position = playerPos;
    unhideAfterDelay(unhide);
    }

}

function unhideAfterDelay(toUnhide: GameObject){
yield WaitForSeconds(1);

toUnhide.SetActive(true);
}

