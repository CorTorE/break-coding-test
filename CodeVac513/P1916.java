package CodeVac513;

import java.io.*;
import java.util.ArrayList;
import java.util.PriorityQueue;
import java.util.StringTokenizer;

public class P1916 {
    static ArrayList<Node>[] adjacentList;
    static int[] distance;
    static PriorityQueue<Node> q = new PriorityQueue<Node>();
    static boolean[] visited;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int N = Integer.parseInt(st.nextToken());
        adjacentList = new ArrayList[N + 1];
        distance = new int[N + 1];
        visited = new boolean[N + 1];
        for (int i = 0; i <= N; i++) {
            adjacentList[i] = new ArrayList<Node>();
            distance[i] = Integer.MAX_VALUE;
        }
        st = new StringTokenizer(br.readLine());
        int M = Integer.parseInt(st.nextToken());

        for (int i = 0; i < M; i++) {
            st = new StringTokenizer(br.readLine());
            int start = Integer.parseInt(st.nextToken());
            int end = Integer.parseInt(st.nextToken());
            int weight = Integer.parseInt(st.nextToken());

            adjacentList[start].add(new Node(end, weight));
        }

        st = new StringTokenizer(br.readLine());
        int startNodeIndex = Integer.parseInt(st.nextToken());
        int endNodeIndex = Integer.parseInt(st.nextToken());

        daijkstra(startNodeIndex);

        bw.write(distance[endNodeIndex] + "\n");
        bw.flush();
        bw.close();
        br.close();
    }

    static public void daijkstra(int startNodeIndex) {
        distance[startNodeIndex] = 0;
        q.add(new Node(startNodeIndex, 0));

        while (!q.isEmpty()) {
            Node node = q.poll();
            int currentNodeIndex = node.nextNode;

            if (visited[currentNodeIndex]) continue;
            visited[currentNodeIndex] = true;

            for (int i = 0; i < adjacentList[currentNodeIndex].size(); i++) {
                Node tempNode = adjacentList[currentNodeIndex].get(i);
                int next = tempNode.nextNode;
                int weight = tempNode.weight;

                if (distance[next] > distance[currentNodeIndex] + weight) {
                    distance[next] = distance[currentNodeIndex] + weight;
                    q.add(new Node(next, distance[next]));
                }
            }
        }
    }

    static class Node implements Comparable<Node> {
        int nextNode;
        int weight;

        Node(int nextNode, int weight) {
            this.nextNode = nextNode;
            this.weight = weight;
        }

        @Override
        public int compareTo(Node o) {
            if(this.weight > o.weight) return 1;
            return -1;
        }
    }
}
