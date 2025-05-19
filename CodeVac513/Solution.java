package CodeVac513;

class ListNode {
    int val;
    ListNode next;

    ListNode() {
    }

    ListNode(int val) {
        this.val = val;
    }

    ListNode(int val, ListNode next) {
        this.val = val;
        this.next = next;
    }
}


class Solution {

    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode left = l1;
        ListNode right = l2;

        int carry = 0;
        ListNode head = new ListNode();
        ListNode current = head;
        while (left != null || right != null) {
            int sum = carry;
            if (left != null && right != null) {
                sum += left.val + right.val;
                left = left.next;
                right = right.next;
            } else if (left == null) {
                sum += right.val;
                right = right.next;
            } else {
                sum += left.val;
                left = left.next;
            }

            if (sum >= 10) {
                sum -= 10;
                carry = 1;
            } else {
                carry = 0;
            }

            current.next = new ListNode(sum);
            current = current.next;
        }
        if (carry > 0) {
            current.next = new ListNode(carry);
        }
        return head.next;
    }

}