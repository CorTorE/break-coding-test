package CodeVac513;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.StringTokenizer;

public class P2294 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int k = Integer.parseInt(st.nextToken());

        int[] coins = new int[n];
        for (int i = 0; i < n; i++) {
            coins[i] = Integer.parseInt(br.readLine());
        }

        int[] dp = new int[k + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);
        for (int i = 0; i < n; i++) {
            if (coins[i] > k) {
                break;
            }
            dp[coins[i]] = 1;
        }

        Arrays.sort(coins);
        for (int i = 0; i < coins[0]; i++) {
            dp[i] = -1;
        }

        for (int i = 1; i <= k; i++) {
            if (dp[i] == -1) {
                continue;
            }
            for (int j = 0; j < n; j++) {
                if (i >= coins[j] && dp[i - coins[j]] != -1 && dp[i - coins[j]] != Integer.MAX_VALUE) {
                    dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
                }
            }
            if (dp[i] == Integer.MAX_VALUE) {
                dp[i] = -1;
            }
        }

//        for (int i = 1; i <= k; i++) {
//            for (int j = i - 1; j > 0; j--) {
//                if (dp[j] == -1 || dp[i - j] == -1) {
//                    continue;
//                }
//                dp[i] = Math.min(dp[j] + dp[i - j], dp[i]);
//            }
//            if (dp[i] == 0) {
//                dp[i] = -1;
//            }
//        }
//        bw.write(String.valueOf(dp[k]));
        if (dp[k] == Integer.MAX_VALUE || dp[k] == -1) {
            bw.write("-1");
        } else {
            bw.write(String.valueOf(dp[k]));
        }

        br.close();
        bw.flush();
        bw.close();
    }
}
