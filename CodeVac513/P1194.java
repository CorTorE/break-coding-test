package CodeVac513;

import java.io.*;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class P1194 {
    static int N;
    static int M;
    static String[][] map;
    static boolean[][][] visited;
    static int[] moveX = {0, 0, -1, 1};
    static int[] moveY = {-1, 1, 0, 0};
    static boolean[] keys = new boolean[6];

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer st = new StringTokenizer(br.readLine());

        N = Integer.parseInt(st.nextToken());
        M = Integer.parseInt(st.nextToken());
        map = new String[N][M];
        visited = new boolean[N][M][64];
        Node startNode = null;
        for (int i = 0; i < N; i++) {
            String line = br.readLine();
            int index = 0;
            for (int j = 0; j < M; j++) {
                map[i][j] = String.valueOf(line.charAt(index++));
                if (map[i][j].equals("0")) {
                    map[i][j] = ".";
                    startNode = new Node(i, j, 0, 0);
                }
            }
        }

        bw.write(bfs(startNode) + "\n");

        bw.flush();
        br.close();
        bw.close();
    }

    static public int bfs(Node startNode) {
        Queue<Node> q = new LinkedList<>();

        q.offer(startNode);
        visited[startNode.x][startNode.y][0] = true;
        while (!q.isEmpty()) {
            Node current = q.poll();
            if (map[current.x][current.y].equals("1")) return current.moveCount;

            for (int i = 0; i < 4; i++) {
                int nextX = current.x + moveX[i];
                int nextY = current.y + moveY[i];

                if (nextX < 0 || nextX >= N || nextY < 0 || nextY >= M) continue;
                if (visited[nextX][nextY][current.key] || map[nextX][nextY].equals("#")) continue;

                int nextKey = checkKeys(nextX, nextY);
                int checkDoor = checkDoor(nextX, nextY);

                if (nextKey != 6) {
                    nextKey = 1 << checkKeys(nextX, nextY);
                    nextKey = current.key | nextKey;
                    visited[nextX][nextY][nextKey] = true;
                    q.offer(new Node(nextX, nextY, current.moveCount + 1, nextKey));
                } else if (checkDoor != 6) {
                    if ((current.key & 1 << checkDoor) == (int) Math.pow(2, checkDoor)) {
                        visited[nextX][nextY][current.key] = true;
                        q.offer(new Node(nextX, nextY, current.moveCount + 1, current.key));
                    }
                } else {
                    visited[nextX][nextY][current.key] = true;
                    q.offer(new Node(nextX, nextY, current.moveCount + 1, current.key));
                }
            }
        }
        return -1;
    }

    static public int checkDoor(int x, int y) {
        switch (map[x][y]) {
            case "A": {
                return 0;
            }
            case "B": {
                return 1;
            }
            case "C": {
                return 2;
            }
            case "D": {
                return 3;
            }
            case "E": {
                return 4;
            }
            case "F": {
                return 5;
            }
        }
        return 6;
    }

    static public int checkKeys(int x, int y) {
        switch (map[x][y]) {
            case "a": {
                return 0;
            }
            case "b": {
                return 1;
            }
            case "c": {
                return 2;
            }
            case "d": {
                return 3;
            }
            case "e": {
                return 4;
            }
            case "f": {
                return 5;
            }
        }
        return 6;
    }

    static class Node {
        int x, y, moveCount, key;

        public Node(int x, int y, int moveCount, int key) {
            this.x = x;
            this.y = y;
            this.moveCount = moveCount;
            this.key = key;
        }
    }
}




//틀린 풀이
//0. 완전 탐색에 구현을 잘 하는 문제라 생각해서 DFS + 구현 잘하는 걸로 일단 시작해봤는데, 이런 최단 경로 문제는 BFS가 더 유리한 것을 이번에 알게 됨.
//1. 무한 루프의 가능성이 있어서 visited를 추가함.
//2. DFS라서 열쇠를 가져온 뒤 다시 문으로 갈 수 없음.
//3. 비슷한 예시로, 열쇠를 가져오기 전 문을 탐색하기에 통과할 수 있는 경우도 -1로 나옴.
//4. 열쇠 상태 관리가 제대로 되지 않음.
//5. visited 방문 후 다시 방문해야 할 수도 있는데, 지금은 방문하면 다시 방문 못함.
//6. 열쇠 상태 관리가 들어갔을 때, 50 * 50 * 64 크기의 완전 탐색이 이뤄져야 하는데 여기서 시간 초과가 발생할 확률이 높음.
//public class P1194 {
//    static int N;
//    static int M;
//    static String[][] map;
//    static boolean[][] visited;
//    static int[] moveX = {0, 0, -1, 1};
//    static int[] moveY = {-1, 1, 0, 0};
//    static int distance = Integer.MAX_VALUE;
//    static boolean[] keys = new boolean[6];
//
//    public static void main(String[] args) throws IOException {
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
//        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
//        StringTokenizer st = new StringTokenizer(br.readLine());
//
//        N = Integer.parseInt(st.nextToken());
//        M = Integer.parseInt(st.nextToken());
//        int startX = 0;
//        int startY = 0;
//        map = new String[N + 2][M + 2];
//        visited = new boolean[N + 2][M + 2];
//        for (int i = 0; i < N + 2; i++) {
//
//            if (i == 0 || i == N + 1) {
//                for (int j = 0; j < M + 2; j++) {
//                    map[i][j] = "#";
//                }
//            } else {
//                map[i][0] = "#";
//                map[i][M + 1] = "#";
//            }
//        }
//
//        for (int i = 1; i < N + 1; i++) {
//            String line = br.readLine();
//            int index = 0;
//            for (int j = 1; j < M + 1; j++) {
//                map[i][j] = String.valueOf(line.charAt(index++));
//                if (map[i][j].equals("0")) {
//                    map[i][j] = ".";
//                    startX = i;
//                    startY = j;
//                }
//            }
//        }
//
//        dfs(startX, startY, 0);
//
//        if (distance == Integer.MAX_VALUE)
//            bw.write("-1\n");
//        else
//            bw.write(distance + "\n");
//
//        bw.flush();
//        bw.close();
//        br.close();
//    }
//
//    static public void dfs(int startX, int startY, int moveCount) {
//        if (map[startX][startY].equals("1")) {
//            if (distance > moveCount) distance = moveCount;
//            return;
//        }
//
//        for (int i = 0; i < 4; i++) {
//            int nextX = startX + moveX[i];
//            int nextY = startY + moveY[i];
//
//            if (checkRange(nextX, nextY) && !visited[nextX][nextY]) {
//                visited[nextX][nextY] = true;
//                if (checkWall(nextX, nextY) || checkDoor(nextX, nextY)) {
//                    if (!checkLockedDoor(nextX, nextY))
//                        continue;
//                }
//                getKeys(nextX, nextY);
//                dfs(nextX, nextY, moveCount + 1);
//                visited[nextX][nextY] = false;
//            }
//        }
//    }
//
//    static public boolean checkRange(int x, int y) {
//        if (x >= 1 && x <= N && y >= 1 && y <= M) {
//            return true;
//        }
//        return false;
//    }
//
//    static public boolean checkWall(int x, int y) {
//        if (map[x][y].equals("#")) {
//            return true;
//        }
//        return false;
//    }
//
//    static public boolean checkDoor(int x, int y) {
//        switch (map[x][y]) {
//            case "A": {
//                return true;
//            }
//            case "B": {
//                return true;
//            }
//            case "C": {
//                return true;
//            }
//            case "D": {
//                return true;
//            }
//            case "E": {
//                return true;
//            }
//            case "F": {
//                return true;
//            }
//        }
//        return false;
//    }
//
//    static public void getKeys(int x, int y) {
//        switch (map[x][y]) {
//            case "a": {
//                keys[0] = true;
//                break;
//            }
//            case "b": {
//                keys[1] = true;
//                break;
//            }
//            case "c": {
//                keys[2] = true;
//                break;
//            }
//            case "d": {
//                keys[3] = true;
//                break;
//            }
//            case "e": {
//                keys[4] = true;
//                break;
//            }
//            case "f":
//                keys[5] = true;
//                break;
//        }
//
//    }
//
//    static public boolean checkLockedDoor(int x, int y) {
//        if (map[x][y].equals("A") && keys[0]) {
//            return true;
//        }
//
//        if (map[x][y].equals("B") && keys[1]) {
//            return true;
//        }
//
//        if (map[x][y].equals("C") && keys[2]) {
//            return true;
//        }
//
//        if (map[x][y].equals("D") && keys[3]) {
//            return true;
//        }
//
//        if (map[x][y].equals("E") && keys[4]) {
//            return true;
//        }
//
//        if (map[x][y].equals("F") && keys[5]) {
//            return true;
//        }
//
//        return false;
//    }
//
//}
