package CodeVac513;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P9663 {
    static int N;
    static int ans = 0;
    static boolean[] usedCol;
    static boolean[] diag1;
    static boolean[] diag2;

    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        N = Integer.parseInt(st.nextToken());
        usedCol = new boolean[N];
        diag1 = new boolean[2 * N - 1];
        diag2 = new boolean[2 * N - 1];

        dfs(0);

        bw.write(ans + "\n");
        bw.flush();
        bw.close();
        br.close();
    }

    static void dfs(int row) {
        if (row == N) {
            ans++;
            return;
        }
        for (int col = 0; col < N; col++) {
            if (usedCol[col] || diag1[col + row] || diag2[col - row + N - 1]) {
                continue;
            }

            usedCol[col] = true;
            diag1[col + row] = true;
            diag2[col - row + N - 1] = true;

            dfs(row + 1);

            usedCol[col] = false;
            diag1[col + row] = false;
            diag2[col - row + N - 1] = false;
        }

    }
}
