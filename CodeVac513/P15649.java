package CodeVac513;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Stack;
import java.util.StringTokenizer;

public class P15649 {
    static int[] nums;
    static boolean[] visited;
    static int M;
    static Queue<String> ansQueue = new LinkedList();

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int N = Integer.parseInt(st.nextToken());
        M = Integer.parseInt(st.nextToken());

        nums = new int[N];
        visited = new boolean[N + 1];

        for (int i = 1; i <= N; i++) {
            nums[i - 1] = i;
        }

        dfs(N, 0, new Stack<>());

        while (!ansQueue.isEmpty()) {
            bw.write(ansQueue.poll() + "\n");
        }
        bw.flush();
        bw.close();
        br.close();
    }

    static void dfs(int N, int depth, Stack<Integer> ans) {
        if (depth >= M) {
            StringBuilder sb = new StringBuilder();
            for (int num : ans) {
                sb.append(num).append(" ");
            }
            ansQueue.offer(sb.toString());
            return;
        }

        for (int i = 0; i < N; i++) {
            if (visited[nums[i]])
                continue;
            visited[nums[i]] = true;
            ans.push(nums[i]);
            dfs(N, depth + 1, ans);
            visited[nums[i]] = false;
            ans.pop();
        }

    }
}
