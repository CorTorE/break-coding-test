package CodeVac513;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P1520 {
    static int[][] memo;
    static int[][] map;
    static int[] moveX = {0, 0, -1, 1};
    static int[] moveY = {-1, 1, 0, 0};
    static int N;
    static int M;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer st = new StringTokenizer(br.readLine());

        N = Integer.parseInt(st.nextToken());
        M = Integer.parseInt(st.nextToken());

        memo = new int[N][M];
        map = new int[N][M];

        for (int i = 0; i < N; i++) {
            st = new StringTokenizer(br.readLine());
            for (int j = 0; j < M; j++) {
                map[i][j] = Integer.parseInt(st.nextToken());
                memo[i][j] = -1;
            }
        }

        bw.write(String.valueOf(dfs(0, 0, N - 1, M - 1)));
        bw.flush();
        bw.close();
        br.close();
    }

    static int dfs(int currentX, int currentY, int goalX, int goalY) {
        if (currentX == goalX && currentY == goalY) {
            return 1;
        }

        if (memo[currentX][currentY] != -1) {
            return memo[currentX][currentY];
        }

        memo[currentX][currentY] = 0;
        for (int i = 0; i < 4; i++) {
            int nextX = currentX + moveX[i];
            int nextY = currentY + moveY[i];

            if (nextX < 0 || nextX >= N || nextY < 0 || nextY >= M) {
                continue;
            }

            if (map[currentX][currentY] <= map[nextX][nextY])
                continue;

            memo[currentX][currentY] += dfs(nextX, nextY, goalX, goalY);
        }

        return memo[currentX][currentY];
    }

}
