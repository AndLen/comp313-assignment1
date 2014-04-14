using UnityEngine;
using System.Collections;
using System.Collections.Generic;

/**
 * Translated from COMP261 last year!
 * */

public class A_Star
{

		public static List<Vector3> findPath (Vector3 startV, Vector3 endV)
		{
				List<A_Star_Object.Node> allSquares = divideMapIntoSquares ();
				A_Star_Object.Node start = findNode (allSquares, startV);
				A_Star_Object.Node end = findNode (allSquares, endV);

				PriorityQueue<A_Star_Object> queue = new PriorityQueue<A_Star_Object> ();
				queue.offer (new A_Star_Object (start, null, 0, estimate (startV, endV)));
				while (!queue.isEmpty()) {
						A_Star_Object processing = queue.poll ();
						if (!processing.node.visited) {
								processing.node.visited = true;
								processing.node.pathFrom = processing.from;
								processing.node.cost = processing.costToHere;
								// Found it!
								if (processing.node.equals (end)) {
										// Return path we used.
										return (pathFrom (start, end));
								}

				
								foreach (A_Star_Object.Node entry in processing.node.neighbours) {

										//Don't add it if we've visited it or it's not valid.
										if (!entry.visited) {
												// Cost to our neighbour from the root (guaranteed
												// lowest)
												Vector3 checkForWalls = entry.location;
												//checkForWalls.y = checkForWalls.y+ 1.6f;
												Collider[] colliders = Physics.OverlapSphere (checkForWalls, 1.5f);
										//		foreach (Collider collider in colliders)
										//				Debug.Log (collider.ToString () + " ");
										//		Debug.Log (colliders.Length + " " + entry.location);
												if (colliders.Length == 1 || entry.equals (end)) {
														double costToNeigh = processing.costToHere + 3;

														// Estimated cost to the end point from the neighbour.
														double estTotal = estimate (entry.location, endV);

														queue.offer (new A_Star_Object (entry,
						                              processing.node, costToNeigh, estTotal));
												}
										}
					
								}
						}
				}
				return null;
		}

		private static List<Vector3> pathFrom (A_Star_Object.Node start, A_Star_Object.Node node)
		{
				// Work backwards to get all the segments we used.
				List<Vector3> pathList = new List<Vector3> ();
				while (!node.equals(start)) {
						// Get neighbour's path to us.
						pathList.Add (node.pathFrom.location);
						node = node.pathFrom;
				}
				pathList.Reverse ();
				return pathList;
		}

		private static A_Star_Object.Node findNode (List<A_Star_Object.Node> squares, Vector3 target)
		{
				foreach (A_Star_Object.Node node in squares) {
						if (target.x > (node.location.x - 1.5) && target.x < (node.location.x + 1.5) && target.z > (node.location.z - 1.5) && target.z < (node.location.z + 1.5)) {
								return node;
						}
				}
				return null;
		}
	
		private static List<A_Star_Object.Node> divideMapIntoSquares ()
		{
				A_Star_Object.Node[,] squaresArray = new A_Star_Object.Node[17, 17];
				//Divides into 3x3 squares as that is roughly the AI's size
				for (int x = 0; x < 17; x++) {
						for (int z = 0; z < 17; z++) {
								squaresArray [x, z] = new A_Star_Object.Node (new Vector3 ((x * 3) + 1.5f, 0, (z * 3) + 1.5f));
						}
				}
				//Add neighbours
				for (int x = 0; x < 17; x++) {
						for (int z = 0; z < 17; z++) {
								A_Star_Object.Node current = squaresArray [x, z];
								if (x > 1) {
										current.addNeighbour (squaresArray [x - 1, z]);
								}
								if (x < 16) {
										current.addNeighbour (squaresArray [x + 1, z]);
								}
								if (z > 1) {
										current.addNeighbour (squaresArray [x, z - 1]);
								}
								if (z < 16) {
										current.addNeighbour (squaresArray [x, z + 1]);
								}
						}
				}
				List<A_Star_Object.Node> squares = new List<A_Star_Object.Node> ();
				for (int x = 0; x < 17; x++) {
						for (int z = 0; z < 17; z++) {
								squares.Add (squaresArray [x, z]);
						}
				}
		
				return squares;
		}

		private static double estimate (Vector3 start, Vector3 end)
		{
				return Vector3.Distance (start, end);
		}
}
