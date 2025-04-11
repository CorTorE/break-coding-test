package CodeVac513;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P1806 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int N = Integer.parseInt(st.nextToken());
        int S = Integer.parseInt(st.nextToken());

        int[] nums = new int[N];
        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < N; i++) {
            nums[i] = Integer.parseInt(st.nextToken());
        }

        bw.write(String.valueOf(twoPointer(nums, S, N)));

        bw.flush();
        bw.close();
        br.close();
    }

    static int twoPointer(int[] nums, int S, int N) {
        int start = 0;
        int end = 0;
        int sum = 0;
        int result = Integer.MAX_VALUE;
        while (true) {
            if (sum >= S) {
                int ans = end - start;
                if (ans < result)
                    result = ans;
                sum -= nums[start];
                start++;
            } else if (end == N) {
                break;
            } else {
                sum += nums[end++];
            }
        }

        if (result == Integer.MAX_VALUE)
            return 0;
        return result;
    }
}
