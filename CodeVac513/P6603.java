package CodeVac513;

import java.io.*;
import java.util.*;

public class P6603 {
    static Queue<String> q = new LinkedList<String>();

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        while (true) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int k = Integer.parseInt(st.nextToken());

            if (k == 0) break;

            int[] nums = new int[k];

            for (int i = 0; i < k; i++) {
                nums[i] = Integer.parseInt(st.nextToken());
            }
            Arrays.sort(nums);

            getCombination(nums, 0, 0, new Stack<Integer>());

            while (!q.isEmpty()) {
                bw.write(q.poll() + "\n");
            }

            bw.write("\n");
            bw.flush();
        }
        bw.flush();
        br.close();
        bw.close();
    }

    public static void getCombination(int[] nums, int depth, int currentIndex, Stack<Integer> ans) {
        if (depth >= 6) {
            StringBuilder sb = new StringBuilder();
            int[] foundCase = new int[6];
            int index = 0;
            for (Integer num : ans) {
                foundCase[index++] = num;
            }
            for (Integer num : foundCase) {
                sb.append(num).append(" ");
            }

            q.offer(sb.toString());
            return;
        }

        for (int i = currentIndex; i < nums.length; i++) {
            int n = nums[i];
            ans.push(n);
            getCombination(nums, depth + 1, i + 1, ans);
            if (!ans.isEmpty()) ans.pop();
        }
    }
}
