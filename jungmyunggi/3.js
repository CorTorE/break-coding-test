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
    let carry = false;
    const result = [];

    let node1 = l1;
    let node2 = l2;
    while (node1 || node2) {
        let v1 = node1 ? node1.val : 0;
        let v2 = node2 ? node2.val : 0;
        let temp = v1 + v2;
        if (carry) temp++;
        if (temp >= 10) {
            carry = true;
            result.push(temp - 10);
        } else {
            carry = false;
            result.push(temp);
        }

        node1 = node1.next || 0;
        node2 = node2.next || 0;
    }

    if (carry) {
        result.push(1);
    }

    const dummy = new ListNode(0);
    let current = dummy;

    for (const num of result) {
        current.next = new ListNode(num);
        current = current.next;
    }

    return dummy.next;
};
