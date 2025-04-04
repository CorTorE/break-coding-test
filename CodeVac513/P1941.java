package CodeVac513;

import java.io.*;
import java.util.LinkedList;
import java.util.Queue;

public class P1941 {
    static String[][] map = new String[5][5];
    static boolean[][] visited;
    static int[] moveX = {0, 0, -1, 1};
    static int[] moveY = {-1, 1, 0, 0};
    static boolean[] selectedStudents = new boolean[25];
    static boolean[][] selected;
    static int ans = 0;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        for (int i = 0; i < 5; i++) {
            String[] temp = br.readLine().split("");
            for (int j = 0; j < 5; j++) {
                map[i][j] = temp[j];
            }
        }

        dfs(0, 0);

        bw.write(String.valueOf(ans));
        bw.flush();
        bw.close();
        br.close();
    }

    static void dfs(int index, int count) {
        if (count == 7) {
            if (checkSomCount()) {
                if (isAdjacent()) ans++;
            }
            return;
        }

        for (int i = index; i < 25; i++) {
            if (selectedStudents[i]) continue;
            selectedStudents[i] = true;
            dfs(i, count + 1);
            selectedStudents[i] = false;
        }
    }

    static boolean isAdjacent() {
        Queue<int[]> queue = new LinkedList<>();
        visited = new boolean[5][5];
        selected = new boolean[5][5];

        for (int i = 0; i < 25; i++) {
            if (selectedStudents[i]) {
                int x = i / 5;
                int y = i % 5;
                selected[x][y] = true;
            }
        }

        int startX = -1, startY = -1;
        for (int i = 0; i < 25; i++) {
            if (selectedStudents[i]) {
                startX = i / 5;
                startY = i % 5;
                break;
            }
        }

        queue.add(new int[]{startX, startY});
        visited[startX][startY] = true;
        int count = 1;
        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            int x = current[0];
            int y = current[1];

            if (count == 7) return true;

            for (int i = 0; i < 4; i++) {
                int nextX = x + moveX[i];
                int nextY = y + moveY[i];

                if (nextX < 0 || nextX >= 5 || nextY < 0 || nextY >= 5) continue;

                if (selected[nextX][nextY] && !visited[nextX][nextY]) {
                    visited[nextX][nextY] = true;
                    queue.add(new int[]{nextX, nextY});
                    count++;
                }
            }
        }
        return false;
    }

    static boolean checkSomCount() {
        int count = 0;
        for (int i = 0; i < 25; i++) {
            if (selectedStudents[i]) {
                int x = i / 5;
                int y = i % 5;

                if (map[x][y].equals("S")) count++;
            }
        }

        return count >= 4;
    }
}
