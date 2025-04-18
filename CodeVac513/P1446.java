package CodeVac513;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class P1446 {
    static int N;
    static int D;
    static ArrayList<Node> roadList = new ArrayList<>();
    static int[] memo;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer st = new StringTokenizer(br.readLine());

        N = Integer.parseInt(st.nextToken());
        D = Integer.parseInt(st.nextToken());
        memo = new int[D + 1];
        for (int i = 0; i <= D; i++) {
            memo[i] = i;
        }

        for (int i = 0; i < N; i++) {
            st = new StringTokenizer(br.readLine());
            int start = Integer.parseInt(st.nextToken());
            int end = Integer.parseInt(st.nextToken());
            int length = Integer.parseInt(st.nextToken());

            if (end <= D && end - start > length) {
                roadList.add(new Node(start, end, length));
            }
        }

        dp();
        bw.write(String.valueOf(memo[D]));
        bw.flush();
        bw.close();
        br.close();
    }

    static void dp() {
        for (int i = 0; i <= D; i++) {
            if (i > 0) {
                memo[i] = Math.min(memo[i], memo[i - 1] + 1);
            }

            for (Node road : roadList) {
                if (road.start == i && road.end <= D) {
                    memo[road.end] = Math.min(memo[road.end], memo[i] + road.length);
                }
            }
        }
    }

    static class Node {
        int start, end, length;

        Node(int start, int end, int length) {
            this.start = start;
            this.end = end;
            this.length = length;
        }

    }
}
