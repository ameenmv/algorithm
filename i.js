// Helper function to heapify a subtree rooted at index i in an array of size n
function heapify(arr, n, i) {
  let largest = i; // Initialize largest as root
  let left = 2 * i + 1; // Left child index
  let right = 2 * i + 2; // Right child index

  // If left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // If right child is larger than the largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // If largest is not root
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap

    // Recursively heapify the affected subtree
    heapify(arr, n, largest);
  }
}

// HeapSort function
function heapSort(arr) {
  let n = arr.length;

  // Build a max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Extract elements from the heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];

    // Call heapify on the reduced heap
    heapify(arr, i, 0);
  }
}

// b. Analyze the HeapSort Algorithm
// Time Complexity:
// - Building the heap: O(n)
// - Heapify operation: O(log n)
// - Extracting elements: O(n log n)
// Overall: O(n log n)
// Space Complexity: O(1) (in-place sorting)
// HeapSort is not a stable sort.

// c. Implement the algorithm
// Example usage
const arr = [15, 11, 9, 6, 8, 21];
console.log("Original array:", arr);

heapSort(arr);
console.log("Sorted array:", arr);
