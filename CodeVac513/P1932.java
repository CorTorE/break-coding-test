package CodeVac513;

import java.io.*;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class P1932 {
    //자기 자신이거나 -1만큼의 인덱스만 올라갈 수 있음.
    static ArrayList<int[]> triangle;
    static ArrayList<int[]> memo;
    static int N;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        N = Integer.parseInt(br.readLine());
        triangle = new ArrayList();
        memo = new ArrayList();

        for (int i = 0; i < N; i++) {
            triangle.add(new int[i + 1]);
            memo.add(new int[i + 1]);
        }

        for (int i = 0; i < N; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int index = 0;
            while (st.hasMoreTokens()) {
                triangle.get(i)[index] = Integer.parseInt(st.nextToken());
                index++;
            }
        }

        dp();

        bw.write(String.valueOf(memo.get(0)[0]));
        bw.flush();
        br.close();
        bw.close();
    }

    static void dp() {
        for (int j = 0; j < triangle.get(N-1).length; j++) {
            memo.get(N-1)[j] = triangle.get(N-1)[j];
        }

        for (int i = N - 2; i >= 0; i--) {
            for (int j = 0; j <= i; j++) {
                memo.get(i)[j] = triangle.get(i)[j] + Math.max(memo.get(i+1)[j], memo.get(i+1)[j+1]);
            }
        }
    }
}
