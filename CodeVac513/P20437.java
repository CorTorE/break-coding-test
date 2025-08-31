package CodeVac513;

import java.io.*;
import java.util.LinkedList;
import java.util.Queue;

public class P20437 {

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int T = Integer.parseInt(br.readLine());
        int[] alphabets;
        for (int testCase = 0; testCase < T; testCase++) {
            String W = br.readLine();
            int K = Integer.parseInt(br.readLine());
            alphabets = new int[26];
            countAlphabets(alphabets, W);

            if (K == 1) {
                bw.write("1 1\n");
                continue;
            }

            int max = 0;
            int min = Integer.MAX_VALUE;

            for (int i = 0; i < W.length(); i++) {
                if (alphabets[W.charAt(i) - 'a'] < K) {
                    continue;
                }

                int count = 1;

                for (int j = i + 1; j < W.length(); j++) {
                    if (W.charAt(i) == W.charAt(j)) {
                        count++;
                    }

                    if (count == K) {
                        min = Math.min(min, j - i + 1);
                        max = Math.max(max, j - i + 1);
                        break;
                    }
                }
            }
            if (min == Integer.MAX_VALUE || max == 0) {
                bw.write("-1\n");
            } else {
                bw.write(min + " " + max + "\n");
            }
        }

        br.close();
        bw.flush();
        bw.close();
    }

    public static void countAlphabets(int[] alphabets, String W) {
        for (int i = 0; i < W.length(); i++) {
            alphabets[W.charAt(i) - 'a']++;
        }
    }
}
