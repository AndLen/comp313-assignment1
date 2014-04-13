#pragma strict
var contoller: ThirdPersonController;
var score: int;
var scoreText: GUIText;
var pickupTexture: Texture;
var additionalCustomBehaviour: AdditionalCustomBehaviour;
private var lastItemRemovedTime: float;

function Start() {
    score = 0;
    updateScore(0);
    lastItemRemovedTime = Time.time;

}

function Update() {

}

function OnGUI() {
    GUILayout.BeginArea(Rect(10, 10, 250, 200));
    for (var i = 0; i < score; i++) {
        //Yeah yeah, ugly
        if (i == 0 || i == 4 || i == 8) {
            GUILayout.BeginHorizontal();
        }
        if (GUILayout.Button(pickupTexture, GUILayout.Height(50), GUILayout.Width(50))) {
            removeItem(false);

        }
        if (i == 3 || i == 7 || i == 11) {
            GUILayout.EndHorizontal();
        }

    }

    GUILayout.EndArea();

}

function updateScore(addAmount: int) {

    score += addAmount;
    scoreText.text = "Score: " + score;

}

function removeItem(forcefullyRemoved: boolean) {
    if (forcefullyRemoved) {
        if (Time.time - lastItemRemovedTime > 0.25) {
            updateScore(-1);
            additionalCustomBehaviour.unhidePickup();
            lastItemRemovedTime = Time.time;
        }


    } else {
        updateScore(-1);
        additionalCustomBehaviour.unhidePickup();
    }
}
