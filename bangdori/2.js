/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const head = new ListNode();
  let node = head;
  let carry = 0;

  while (l1 || l2 || carry) {
    node.next = new ListNode();
    node = node.next;

    let temp = carry;
    carry = 0;

    if (l1) temp += l1.val;
    if (l2) temp += l2.val;

    if (temp >= 10) {
      carry += 1;
      temp %= 10;
    }

    node.val = temp;

    l1 = l1 ? l1.next : null;
    l2 = l2 ? l2.next : null;
  }

  return head.next;
};
