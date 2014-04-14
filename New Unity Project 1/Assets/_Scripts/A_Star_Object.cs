using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/**
 * Translated from COMP261 last year!
 * */
public class A_Star_Object
{
		public readonly Node node;
		public readonly Node from;
		public readonly double costToHere;
		public readonly double costToGoal;

		public A_Star_Object (Node node, Node from, double costToHere, double costToGoal)
		{
				this.node = node;
				this.from = from;
				this.costToHere = costToHere;
				this.costToGoal = costToGoal;
		}

		public class Node
		{
				public readonly Vector3 location;
				public Node pathFrom = null;
				public bool visited = false;
				public double cost;
				public readonly List<Node> neighbours = new List<Node> ();

				public Node (Vector3 location)
				{
						this.location = location;
				}

				public bool equals (Node other)
				{
						return Vector3.Equals (location, other.location);
				}

				public bool equals (Vector3 other)
				{
						return Vector3.Equals (location, other);
				}

				public void addNeighbour (Node neighbour)
				{
						neighbours.Add (neighbour);
				}
		}

}
