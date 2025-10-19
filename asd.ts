
class ListItem<T extends any> {
  value: T;
  next: ListItem<T> | null;
  constructor(value: T, next: ListItem<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

function hasCycle(head: ListItem<Number>): boolean {

  let slow: ListItem<Number> | null = head;
  let fast: ListItem<Number> | null = head;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next
    if (slow === fast) {
      return true;
    }
  }
  return false;
}

//make an example linked list with a cycle




//console.log(hasCycle()); // false