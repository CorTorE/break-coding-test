package CodeVac513;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;

public class P2217 {

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int N = Integer.parseInt(br.readLine());
        int[] nums = new int[N];
        for (int i = 0; i < N; i++) {
            nums[i] = Integer.parseInt(br.readLine());
        }
        bw.write(String.valueOf(solve(nums, N)));
        bw.flush();
        br.close();
        bw.close();
    }

    static int solve(int[] nums, int N) {
        Arrays.sort(nums);
        int w = Integer.MIN_VALUE;
        int index = 0;
        for (int i = N - 1; i >= 0; i--, index++) {
            int currentWeight = nums[i] * (index + 1);
            if (w < currentWeight) {
                w = currentWeight;
            }
        }
        return w;
    }

//    static int solve(int[] nums, int N) {
//        Arrays.sort(nums);
//        int w = 0;
//        for (int i = 0; i < N; i++) {
//            w += nums[0];
//        }
//        return w;
//    }
}
