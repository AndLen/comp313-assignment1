using UnityEngine;
using System.Collections;

public class TestScript : MonoBehaviour {
	System.Random random = new System.Random();
	// Use this for initialization
	void Start () {
		
	}
	
    public float speed = 100f;
    
       void Update ()
       {
		   Vector3 v = new Vector3(random.Next(0,2),random.Next(0,2),random.Next(0,2));
		   Debug.Log(v);
           transform.Rotate(v, Space.World);		   
       }
}
