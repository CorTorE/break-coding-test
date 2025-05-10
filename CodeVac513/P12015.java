package CodeVac513;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P12015 {
    static int N;
    static int[] nums;
    static int[] ans;

    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        N = Integer.parseInt(st.nextToken());
        nums = new int[N];
        ans = new int[N];
        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < N; i++) {
            nums[i] = Integer.parseInt(st.nextToken());
        }

        bw.write(String.valueOf(dp()));
        bw.flush();
        bw.close();
        br.close();
    }

    static int dp() {
        ans[0] = nums[0];
        int length = 1;

        for (int i = 1; i < N; i++) {

            int currentValue = nums[i];
            if (ans[length - 1] < currentValue) {
                length++;
                ans[length - 1] = currentValue;
            } else {
                int left = 0;
                int right = length;
                while (left < right) {
                    int mid = (left + right) / 2;

                    if (ans[mid] < currentValue) {
                        left = mid + 1;
                    } else {
                        right = mid;
                    }
                }
                ans[left] = currentValue;
            }
        }
        return length;
    }
}
