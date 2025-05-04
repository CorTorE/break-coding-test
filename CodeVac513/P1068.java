package CodeVac513;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class P1068 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int N = Integer.parseInt(br.readLine());
        StringTokenizer st = new StringTokenizer(br.readLine());
        Node[] tree = new Node[N];

        for (int i = 0; i < N; i++) {
            tree[i] = new Node(i);
        }

        int rootIndex = -1;
        for (int i = 0; i < N; i++) {
            int parentIndex = Integer.parseInt(st.nextToken());
            if (parentIndex == -1) {
                rootIndex = i;
                continue;
            }
            tree[parentIndex].addChild(tree[i]);
            tree[i].setParent(tree[parentIndex]);
        }

        int deleteNodeIndex = Integer.parseInt(br.readLine());

        bw.write(String.valueOf(solve(tree, N, deleteNodeIndex, rootIndex)));

        bw.flush();
        br.close();
        bw.close();
    }

    static public int solve(Node[] tree, int N, int deleteNodeIndex, int rootIndex) {
        if (deleteNodeIndex == rootIndex) {
            return 0;
        }

        deleteNodes(tree, tree[deleteNodeIndex]);

        int count = 0;
        for (int i = 0; i < N; i++) {
            if (tree[i] != null && tree[i].getChildren().isEmpty()) {
                count++;
            }
        }

        return count;
    }

    static void deleteNodes(Node[] tree, Node target) {
        if (target == null) {
            return;
        }

        if (target.getParent() != null) {
            target.getParent().getChildren().remove(target);
        }

        ArrayList<Node> children = new ArrayList<>(target.getChildren());
        for (Node child : children) {
            deleteNodes(tree, child);
        }

        tree[target.currentIndex] = null;

    }

    static class Node {
        int currentIndex;
        ArrayList<Node> children;
        Node parent;

        Node(int currentIndex) {
            this.currentIndex = currentIndex;
            this.children = new ArrayList<Node>();
        }

        public void addChild(Node child) {
            this.children.add(child);
        }

        public void setParent(Node parent) {
            this.parent = parent;
        }

        public Node getParent() {
            return this.parent;
        }

        public ArrayList<Node> getChildren() {
            return this.children;
        }
    }
}
