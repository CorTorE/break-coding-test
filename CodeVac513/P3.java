package CodeVac513;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P3 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        boolean[] used = new boolean[128];
        String s = br.readLine();
        int startIndex = 0;
        int endIndex = 0;
        int maxLength = 0;
        while (endIndex < s.length()) {
            char c = s.charAt(endIndex);
            if (used[c]) {
                used[s.charAt(startIndex)] = false;
                startIndex++;
            } else {
                used[c] = true;
                endIndex++;
                maxLength = Math.max(maxLength, endIndex - startIndex);
            }

        }
        System.out.println("ans = " + (maxLength));
        br.close();
        bw.flush();
        bw.close();
    }


}