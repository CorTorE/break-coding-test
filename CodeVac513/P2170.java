package CodeVac513;

import java.io.*;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class P2170 {
    static int N;
    static ArrayList<Node> nodeList = new ArrayList<Node>();
    static int ans = 0;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer st = new StringTokenizer(br.readLine());
        N = Integer.parseInt(st.nextToken());

        for (int i = 0; i < N; i++) {
            st = new StringTokenizer(br.readLine());
            int x = Integer.parseInt(st.nextToken());
            int y = Integer.parseInt(st.nextToken());
            nodeList.add(new Node(x, y));
        }

        nodeList.sort((a, b) -> {
            if (a.x > b.x) {
                return 1;
            } else if (a.x < b.x) {
                return -1;
            }

            if (a.length > b.length) {
                return 1;
            } else if (a.length < b.length) {
                return -1;
            }
            return 0;
        });

        greedy();

        bw.write(String.valueOf(ans));

        bw.flush();
        bw.close();
        br.close();
    }

    static void greedy() {
        int start = nodeList.get(0).x;
        int end = nodeList.get(0).y;

        for (int i = 1; i < N; i++) {
            Node currentNode = nodeList.get(i);

            if (currentNode.x > end) {
                ans += end - start;
                start = currentNode.x;
                end = currentNode.y;
            } else if (currentNode.y > end) {
                end = currentNode.y;
            }
        }

        ans += end - start;
    }


    static class Node {
        int x, y, length;

        Node(int x, int y) {
            this.x = x;
            this.y = y;
            this.length = y - x;
        }
    }
}

//public class P2170 {
//    static int N;
//    static ArrayList<Node> nodeList = new ArrayList<Node>();
//    static int ans = 0;
//
//    public static void main(String[] args) throws IOException {
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
//        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
//        StringTokenizer st = new StringTokenizer(br.readLine());
//        N = Integer.parseInt(st.nextToken());
//
//        for (int i = 0; i < N; i++) {
//            st = new StringTokenizer(br.readLine());
//            int x = Integer.parseInt(st.nextToken());
//            int y = Integer.parseInt(st.nextToken());
//            nodeList.add(new Node(x, y));
//        }
//
//        nodeList.sort((a, b) -> {
//            if (a.y < b.y) {
//                return 1;
//            } else if (a.y > b.y) {
//                return -1;
//            }
//
//            if (a.length > b.length) {
//                return 1;
//            } else if (a.length < b.length) {
//                return -1;
//            }
//            return 0;
//        });
//
//        greedy();
//
//        bw.write(String.valueOf(ans));
//
//        bw.flush();
//        bw.close();
//        br.close();
//    }
//
//    static void greedy() {
//        Node prevNode = nodeList.get(0);
//        ans += prevNode.length;
//
//        for (int i = 1; i < N; i++) {
//            Node currentNode = nodeList.get(i);
//
//            if (currentNode.y < prevNode.x) {
//                // 완전히 분리된 선분
//                ans += currentNode.length;
//            } else if (currentNode.x < prevNode.x) {
//                ans += Math.max(0, prevNode.x - currentNode.x);
//            }
//
//            prevNode = currentNode;
//
//        }
//    }
//
//
//    static class Node {
//        int x, y, length;
//
//        Node(int x, int y) {
//            this.x = x;
//            this.y = y;
//            this.length = y - x;
//        }
//    }
//}


//public class P2170 {
//    static int N;
//    static ArrayList<Node> nodeList = new ArrayList<Node>();
//    static int ans = 0;
//
//    public static void main(String[] args) throws IOException {
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
//        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
//        StringTokenizer st = new StringTokenizer(br.readLine());
//        N = Integer.parseInt(st.nextToken());
//
//        for (int i = 0; i < N; i++) {
//            st = new StringTokenizer(br.readLine());
//            int x = Integer.parseInt(st.nextToken());
//            int y = Integer.parseInt(st.nextToken());
//            nodeList.add(new Node(x, y));
//        }
//
//        nodeList.sort((a, b) -> {
//            if (a.y < b.y) {
//                return 1;
//            } else if (a.y > b.y) {
//                return -1;
//            }
//
//            if (a.length > b.length) {
//                return 1;
//            } else if (a.length < b.length) {
//                return -1;
//            }
//            return 0;
//        });
//
//        for (int i = 0; i < N; i++) {
//            bw.write(nodeList.get(i).x + " " + nodeList.get(i).y);
//            bw.write("\n");
//        }
//
//        greedy();
//
//        bw.write(String.valueOf(ans));
//
//        bw.flush();
//        bw.close();
//        br.close();
//    }
//
//    static void greedy() {
//        Node prevNode = nodeList.get(0);
//        for (int i = 0; i < N; i++) {
//            Node currentNode = nodeList.get(i);
//
//            if (i == 0) {
//                ans += currentNode.length;
//                continue;
//            }
//
//            if (currentNode.y < prevNode.x) {
//                int length = currentNode.y - currentNode.x;
//                ans += length;
//                prevNode = currentNode;
//                continue;
//            }
//
//            if (currentNode.y <= prevNode.y) {
//                int length = prevNode.x - currentNode.x;
//                ans += length;
//                prevNode = currentNode;
//            }
//        }
//    }
//
//
//    static class Node {
//        int x, y, length;
//
//        Node(int x, int y) {
//            this.x = x;
//            this.y = y;
//            this.length = y - x;
//        }
//    }
//}
