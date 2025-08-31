package CodeVac513;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.StringTokenizer;

public class P16139 {
    static int[][] sum;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        String s = br.readLine();
        int q = Integer.parseInt(br.readLine());
        sum = new int[26][s.length() + 1];
        for (int i = 0; i < 26; i++) {
            Character target = (char) ('a' + i);
            Arrays.fill(sum[i], 0);
            calculate(s, target);
        }

        StringBuilder sb = new StringBuilder();
        for (int testCase = 0; testCase < q; testCase++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            Character target = st.nextToken().charAt(0);
            int l = Integer.parseInt(st.nextToken());
            int r = Integer.parseInt(st.nextToken());
            sb.append(solve(s, l, r, target)).append("\n");
        }
        bw.write(sb.toString());
        bw.flush();
        bw.close();
        br.close();
    }

    static void calculate(String s, Character target) {
        int index = target - 'a';
        if (s.charAt(0) == target) {
            sum[index][0] = 1;
        }
        for (int i = 1; i < s.length(); i++) {
            sum[index][i] = sum[index][i - 1];
            if (s.charAt(i) == target) {
                sum[index][i] = sum[index][i - 1] + 1;
            }
        }
    }

    static int solve(String s, int l, int r, Character target) {
        int index = target - 'a';
        if (s.charAt(l) == target) {
            return sum[index][r] - sum[index][l] + 1;
        }
        return sum[index][r] - sum[index][l];
    }
}
