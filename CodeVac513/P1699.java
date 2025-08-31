package CodeVac513;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P1699 {
    static int[] dp = new int[100001];

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int N = Integer.parseInt(br.readLine());
        for (int i = 0; i <= N; i++) {
            dp[i] = i;
        }
        dp(N);

        bw.write(String.valueOf(dp[N]));
        br.close();
        bw.flush();
        bw.close();
    }

    public static void dp(int N) {
        for (int current = 2; current <= N; current++) {
            int num = (int) Math.sqrt(current);
            for (int i = 1; i <= num; i++) {
                int rest = current - i * i;
                dp[current] = Math.min(dp[current], dp[rest] + 1);
            }
        }
    }
}
