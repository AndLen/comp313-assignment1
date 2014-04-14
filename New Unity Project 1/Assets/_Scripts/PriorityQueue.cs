using System.Collections;

/**
*Translated from the Java PriorityQueue.
 **/
public class PriorityQueue<E>
{
		private E[] queue;
		private int modCount = 0;
		private int size = 0;
		private readonly ValueComparator comparator = new ValueComparator ();

		public PriorityQueue ()
		{
				this.queue = new E[300];

		}

		public bool offer (E e)
		{
				if (e == null) {
						throw new System.NullReferenceException ();
				}
				modCount++;
				int i = size;
				if (i >= queue.Length)
						grow (i + 1);
				size = i + 1;
				if (i == 0)
						queue [0] = e;
				else
						siftUp (i, e);
				return true;
		}

		public E poll ()
		{
				if (size == 0)
						return default(E);
				int s = --size;
				modCount++;
				E result = queue [0];
				E x = queue [s];
				queue [s] = default(E);
				if (s != 0)
						siftDown (0, x);
				return result;
		}

		public int queueSize ()
		{
				return size;
		}

		public bool isEmpty ()
		{
				return queueSize () == 0;
		}
	
		private void grow (int minCapacity)
		{
				int oldCapacity = queue.Length;
				// Double size if small; else grow by 50%
				int newCapacity = oldCapacity + ((oldCapacity < 64) ?
		                                 (oldCapacity + 2) :
		                                 (oldCapacity >> 1));
				E[] newQueue = new E[newCapacity];
				System.Array.Copy (queue, newQueue, oldCapacity);
				queue = newQueue;
		}

		private void siftUp (int k, E x)
		{
				while (k > 0) {
						int parent = (k - 1) >> 1;
						E e = queue [parent];
						if (comparator.Compare (x, e) >= 0)
								break;
						queue [k] = e;
						k = parent;
				}
				queue [k] = x;
		}

		private void siftDown (int k, E x)
		{
				int half = size >> 1;
				while (k < half) {
						int child = (k << 1) + 1;
						E c = queue [child];
						int right = child + 1;
						if (right < size &&
								comparator.Compare (c, queue [right]) > 0)
								c = queue [child = right];
						if (comparator.Compare (x, c) <= 0)
								break;
						queue [k] = c;
						k = child;
				}
				queue [k] = x;
		}
	
		public class ValueComparator : System.Collections.IComparer
		{
				public int Compare (System.Object ob1, System.Object ob2)
				{
						int retval = 0;
						if (ob1 is A_Star_Object && ob2 is A_Star_Object) {
								A_Star_Object c1 = (A_Star_Object)ob1;
								A_Star_Object c2 = (A_Star_Object)ob2;
								if (c1.costToGoal + c1.costToHere < c2.costToGoal + c2.costToHere)
										retval = -1;
								if (c1.costToGoal + c1.costToHere > c2.costToGoal + c2.costToHere)
										retval = 1;
						} else {
								throw new System.Exception ("ValueComparator: Illegal arguments!");
						}
						return (retval);
				}
		}
}
