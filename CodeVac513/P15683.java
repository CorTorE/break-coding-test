package CodeVac513;

import java.io.*;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class P15683 {
    static int n;
    static int m;
    static int[][] map;
    static ArrayList<Node> cctvList = new ArrayList<Node>();
    static boolean[][] monitored;
    static int ans = Integer.MAX_VALUE;


    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        StringTokenizer st = new StringTokenizer(br.readLine());
        n = Integer.parseInt(st.nextToken());
        m = Integer.parseInt(st.nextToken());

        map = new int[n][m];
        monitored = new boolean[n][m];

        for (int i = 0; i < n; i++) {
            st = new StringTokenizer(br.readLine());
            for (int j = 0; j < m; j++) {
                map[i][j] = Integer.parseInt(st.nextToken());
                if (map[i][j] != 0 && map[i][j] != 6) {
                    cctvList.add(new Node(i, j));
                }
            }
        }

        dfs(0);

        bw.write(String.valueOf(ans));


        bw.flush();
        bw.close();
        br.close();
    }

    static void dfs(int depth) {
        if (depth == cctvList.size()) {
            int count = 0;
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < m; j++) {
                    if (map[i][j] == 0 && !monitored[i][j]) {
                        count++;
                    }
                }
            }
            if (count < ans) ans = count;
            return;
        }
        Node current = cctvList.get(depth);
        int cctvType = map[current.x][current.y];

        if (cctvType == 1) {
            int[][] directions = {
                    {0, -1},
                    {-1, 0},
                    {0, 1},
                    {1, 0}
            };
            for (int i = 0; i < 4; i++) {
                ArrayList<Node> changed = new ArrayList<>();

                int nextX = current.x + directions[i][0];
                int nextY = current.y + directions[i][1];
                while (nextX >= 0 && nextX < n && nextY >= 0 && nextY < m) {
                    if (map[nextX][nextY] == 6) break;
                    if (!monitored[nextX][nextY]) {
                        monitored[nextX][nextY] = true;
                        changed.add(new Node(nextX, nextY));
                    }
                    nextX += directions[i][0];
                    nextY += directions[i][1];
                }
                dfs(depth + 1);
                for (Node changedNode : changed) {
                    monitored[changedNode.x][changedNode.y] = false;
                }
            }
        } else if (cctvType == 2) {
            int[][][] directions = {
                    {{0, -1}, {0, 1}},
                    {{-1, 0}, {1, 0}}
            };
            for (int i = 0; i < 2; i++) {
                ArrayList<Node> changed = new ArrayList<>();

                int nextX = current.x + directions[i][0][0];
                int nextY = current.y + directions[i][0][1];
                while (nextX >= 0 && nextX < n && nextY >= 0 && nextY < m) {
                    if (map[nextX][nextY] == 6) break;
                    if (!monitored[nextX][nextY]) {
                        monitored[nextX][nextY] = true;
                        changed.add(new Node(nextX, nextY));
                    }
                    nextX += directions[i][0][0];
                    nextY += directions[i][0][1];
                }

                nextX = current.x + directions[i][1][0];
                nextY = current.y + directions[i][1][1];
                while (nextX >= 0 && nextX < n && nextY >= 0 && nextY < m) {
                    if (map[nextX][nextY] == 6) break;
                    if (!monitored[nextX][nextY]) {
                        monitored[nextX][nextY] = true;
                        changed.add(new Node(nextX, nextY));
                    }
                    nextX += directions[i][1][0];
                    nextY += directions[i][1][1];
                }

                dfs(depth + 1);
                for (Node changedNode : changed) {
                    monitored[changedNode.x][changedNode.y] = false;
                }
            }
        } else if (cctvType == 3) {
            int[][] directions = {
                    {-1, 0, 0, 1},
                    {0, 1, 1, 0},
                    {1, 0, 0, -1},
                    {0, -1, -1, 0}
            };

            for (int i = 0; i < 4; i++) {
                ArrayList<Node> changed = new ArrayList<>();

                int nextX = current.x + directions[i][0];
                int nextY = current.y + directions[i][1];
                while (nextX >= 0 && nextX < n && nextY >= 0 && nextY < m) {
                    if (map[nextX][nextY] == 6) break;
                    if (!monitored[nextX][nextY]) {
                        monitored[nextX][nextY] = true;
                        changed.add(new Node(nextX, nextY));
                    }
                    nextX += directions[i][0];
                    nextY += directions[i][1];
                }

                nextX = current.x + directions[i][2];
                nextY = current.y + directions[i][3];
                while (nextX >= 0 && nextX < n && nextY >= 0 && nextY < m) {
                    if (map[nextX][nextY] == 6) break;
                    if (!monitored[nextX][nextY]) {
                        monitored[nextX][nextY] = true;
                        changed.add(new Node(nextX, nextY));
                    }
                    nextX += directions[i][2];
                    nextY += directions[i][3];
                }

                dfs(depth + 1);

                for (Node changedNode : changed) {
                    monitored[changedNode.x][changedNode.y] = false;
                }
            }
        } else if (cctvType == 4) {
            int[][][] directions = {
                    {{0, -1}, {-1, 0}, {0, 1}},
                    {{-1, 0}, {0, 1}, {1, 0}},
                    {{0, 1}, {1, 0}, {0, -1}},
                    {{1, 0}, {0, -1}, {-1, 0}}
            };

            for (int i = 0; i < 4; i++) {
                ArrayList<Node> changed = new ArrayList<>();

                for (int j = 0; j < 3; j++) {
                    int nextX = current.x + directions[i][j][0];
                    int nextY = current.y + directions[i][j][1];

                    while (nextX >= 0 && nextX < n && nextY >= 0 && nextY < m) {
                        if (map[nextX][nextY] == 6) break;
                        if (!monitored[nextX][nextY]) {
                            monitored[nextX][nextY] = true;
                            changed.add(new Node(nextX, nextY));
                        }
                        nextX += directions[i][j][0];
                        nextY += directions[i][j][1];
                    }
                }

                dfs(depth + 1);

                for (Node changedNode : changed) {
                    monitored[changedNode.x][changedNode.y] = false;
                }
            }
        } else if (cctvType == 5) {
            int[][] directions = {
                    {0, -1},
                    {-1, 0},
                    {0, 1},
                    {1, 0}
            };

            ArrayList<Node> changed = new ArrayList<>();
            for (int i = 0; i < 4; i++) {
                int nextX = current.x + directions[i][0];
                int nextY = current.y + directions[i][1];

                while (nextX >= 0 && nextX < n && nextY >= 0 && nextY < m) {
                    if (map[nextX][nextY] == 6) break;
                    if (!monitored[nextX][nextY]) {
                        monitored[nextX][nextY] = true;
                        changed.add(new Node(nextX, nextY));
                    }
                    nextX += directions[i][0];
                    nextY += directions[i][1];
                }
            }

            dfs(depth + 1);

            for (Node changedNode : changed) {
                monitored[changedNode.x][changedNode.y] = false;
            }
        }
    }

    static class Node {
        int x, y;

        Node(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }
}
