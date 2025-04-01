package CodeVac513;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class P2206 {

    static int[][] map;
    static int N;
    static int M;
    static boolean[][][] visited;
    static int[] moveX = {0, 0, -1, 1};
    static int[] moveY = {-1, 1, 0, 0};

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer st = new StringTokenizer(br.readLine());

        N = Integer.parseInt(st.nextToken());
        M = Integer.parseInt(st.nextToken());

        map = new int[N][M];
        visited = new boolean[N][M][2];

        for (int i = 0; i < N; i++) {
            String[] temp = br.readLine().split("");
            for (int j = 0; j < M; j++) {
                map[i][j] = Integer.parseInt(temp[j]);
            }
        }

        int ans = bfs(new Node(0, 0, 0, 1));
        bw.write(ans + "\n");

        bw.flush();
        br.close();
        bw.close();

    }

    static int bfs(Node startNode) {
        Queue<Node> q = new LinkedList<>();
        q.offer(startNode);
        visited[startNode.x][startNode.y][startNode.breakWall] = true;

        while (!q.isEmpty()) {
            Node current = q.poll();
            if (current.x == N - 1 && current.y == M - 1)
                return current.moveCount;

            for (int i = 0; i < 4; i++) {
                int nextX = current.x + moveX[i];
                int nextY = current.y + moveY[i];
                int breakWallFlag = current.breakWall;


                if (nextX < 0 || nextX >= N || nextY < 0 || nextY >= M)
                    continue;

                if (visited[nextX][nextY][breakWallFlag])
                    continue;

                if (map[nextX][nextY] == 0) {
                    visited[nextX][nextY][breakWallFlag] = true;
                    q.offer(new Node(nextX, nextY, breakWallFlag, current.moveCount + 1));
                } else if (map[nextX][nextY] == 1 && breakWallFlag == 0) {
                    visited[nextX][nextY][1] = true;
                    q.offer(new Node(nextX, nextY, 1, current.moveCount + 1));
                }

            }
        }
        return -1;

    }

    static class Node {
        int x, y, breakWall, moveCount;

        Node(int x, int y, int breakWall, int moveCount) {
            this.x = x;
            this.y = y;
            this.breakWall = breakWall;
            this.moveCount = moveCount;
        }
    }

}
