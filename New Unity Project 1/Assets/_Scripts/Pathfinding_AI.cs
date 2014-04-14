using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class Pathfinding_AI : MonoBehaviour
{

		private int moveSpeed = 5; //move speed
		private float rotationSpeed = 3; //speed of turning
		List<Vector3> paths;
		private int pathStage = 0;
		private Vector3 currentDest = default(Vector3);
		private GameObject target = null;
		private Vector3 currentTargetPosition = default(Vector3);
		// Use this for initialization
		void Start ()
		{
				updateTarget ();
		}

		void updateTarget ()
		{
				if (target == null || target.transform.position != currentTargetPosition) {
						target = GameObject.FindGameObjectWithTag ("Target");
						if (target != null && target.activeSelf) {
								paths = A_Star.findPath (transform.position, target.transform.position);
								currentTargetPosition = target.transform.position;
								currentDest = paths == null ? default(Vector3) : paths [0];
								pathStage = 0;

						} else {
								target = null;
								currentTargetPosition = default(Vector3);
								currentDest = default(Vector3);
						}
				}
		}
	
		// Update is called once per frame
		void Update ()
		{
				updateTarget ();

				if (currentDest != default(Vector3)) {
						if (atLocation (currentDest, 1f)) {
								if (pathStage >= paths.Count) {
										currentDest = default(Vector3);
										target = null;
										return;
								}
								currentDest = paths [pathStage];
								pathStage++;
								
						} 
						transform.rotation = Quaternion.Slerp (transform.rotation,
			                                       Quaternion.LookRotation (currentDest - transform.position), rotationSpeed * Time.deltaTime);
						transform.position += transform.forward * moveSpeed * Time.deltaTime;
				}

		}

		bool atLocation (Vector3 targetPosition, float distance)
		{
				Vector3 transformVector = transform.position - targetPosition;
				return Mathf.Abs (transformVector.x) < distance && Mathf.Abs (transformVector.z) < distance;
		
		}
}
