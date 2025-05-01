package CodeVac513;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P2156 {
    static int[][] dp;

    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        int[] nums = new int[n];
        dp = new int[n][3];
        for (int i = 0; i < n; i++) {
            nums[i] = Integer.parseInt(br.readLine());
        }
        solve(nums, n);
        bw.write(String.valueOf(Math.max(Math.max(dp[n - 1][0], dp[n - 1][1]), dp[n - 1][2])));
        bw.flush();
        bw.close();
        br.close();
    }

    public static void solve(int[] nums, int n) {
        if (n >= 1) {
            dp[0][0] = 0;
            dp[0][1] = nums[0];
            dp[0][2] = nums[0];
        }

        for (int i = 1; i < n; i++) {
            dp[i][0] = Math.max(dp[i - 1][0], Math.max(dp[i - 1][1], dp[i - 1][2]));
            dp[i][1] = dp[i - 1][0] + nums[i];
            dp[i][2] = dp[i - 1][1] + nums[i];
        }
    }
}
//
//package CodeVac513;
//
//import java.io.BufferedReader;
//import java.io.BufferedWriter;
//import java.io.IOException;
//import java.io.InputStreamReader;
//import java.io.OutputStreamWriter;
//
//public class P2156 {
//    static int[][] dp;
//
//    public static void main(String[] args) throws IOException {
//        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
//        int n = Integer.parseInt(br.readLine());
//        int[] nums = new int[n];
//        dp = new int[n][3];
//        for (int i = 0; i < n; i++) {
//            nums[i] = Integer.parseInt(br.readLine());
//        }
//        solve(nums, n);
//        bw.write(String.valueOf(Math.max(Math.max(dp[n - 1][0], dp[n - 1][1]), dp[n - 1][2])));
//        bw.flush();
//        bw.close();
//        br.close();
//    }
//
//    public static void solve(int[] nums, int n) {
//        dp[0][0] = 0;
//        dp[0][1] = nums[0];
//        dp[0][2] = nums[0];
//        dp[1][0] = dp[0][0];
//        dp[1][1] = dp[0][0] + nums[1];
//        dp[1][2] = dp[0][1] + nums[1];
//        dp[2][0] = dp[1][2];
//        dp[2][1] = dp[1][0] + nums[2];
//        dp[2][2] = dp[1][1] + nums[2];
//        for (int i = 3; i < n; i++) {
//            dp[i][0] = dp[i - 1][2];
//            dp[i][1] = dp[i - 1][0] + nums[i];
//            dp[i][2] = dp[i - 1][1] + nums[i];
//        }
//    }
//}
