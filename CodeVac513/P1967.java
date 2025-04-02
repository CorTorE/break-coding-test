package CodeVac513;

import java.io.*;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class P1967 {
    static ArrayList<Node>[] tree;
    static int ans = Integer.MIN_VALUE;
    static boolean[] visited;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int n = Integer.parseInt(st.nextToken());

        tree = new ArrayList[n + 1];
        visited = new boolean[n + 1];
        for (int i = 1; i <= n; i++) {
            tree[i] = new ArrayList<>();
        }

        for (int i = 0; i < n - 1; i++) {
            st = new StringTokenizer(br.readLine());
            int startNode = Integer.parseInt(st.nextToken());
            int endNode = Integer.parseInt(st.nextToken());
            int weight = Integer.parseInt(st.nextToken());
            tree[startNode].add(new Node(endNode, weight));
            tree[endNode].add(new Node(startNode, weight));
        }
        for (int i = 1; i <= n; i++) {

            dfs(i, 0);
        }
        bw.write(ans + "\n");

        bw.flush();
        bw.close();
        br.close();
    }

    static void dfs(int startNode, int acc) {
        ArrayList<Node> current = tree[startNode];

        int count = 0;
        for (int i = 0; i < current.size(); i++) {
            if (visited[current.get(i).next]) count++;
        }
        if (count == current.size()) {
            if (acc >= ans) ans = acc;
            return;
        }

        visited[startNode] = true;
        for (int i = 0; i < current.size(); i++) {
            Node nextNode = current.get(i);
            if (visited[nextNode.next]) {
                continue;
            }
            dfs(nextNode.next, acc + nextNode.weight);
        }
        visited[startNode] = false;


    }

    static class Node {
        int next, weight;

        Node(int next, int weight) {
            this.next = next;
            this.weight = weight;
        }

    }
}
