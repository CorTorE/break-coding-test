package CodeVac513;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class P1759 {
    static Queue<String> answer = new LinkedList<String>();
    static Boolean[] visited;

    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int L = Integer.parseInt(st.nextToken());
        int C = Integer.parseInt(st.nextToken());

        st = new StringTokenizer(br.readLine());
        Character[] alphabet = new Character[C];
        visited = new Boolean[C];
        Arrays.fill(visited, false);
        for (int i = 0; i < C; i++) {
            alphabet[i] = st.nextToken().charAt(0);
        }

        Arrays.sort(alphabet);

        solve(alphabet, L, C, 0, "");

        while (!answer.isEmpty()) {
            bw.write(answer.poll() + "\n");
        }
        bw.flush();
        br.close();
        bw.close();
    }

    static public void solve(Character[] alphabet, int L, int C, int start, String ans) {
        if (ans.length() == L) {
            if (checkVowel(ans) && checkConsonant(ans)) {
                answer.offer(ans);
                return;
            }
        }

        for (int i = start; i < C; i++) {
            solve(alphabet, L, C, i + 1, ans + alphabet[i]);
        }
    }

    static boolean checkVowel(String s) {
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == 'a') {
                return true;
            } else if (s.charAt(i) == 'e') {
                return true;
            } else if (s.charAt(i) == 'i') {
                return true;
            } else if (s.charAt(i) == 'o') {
                return true;
            } else if (s.charAt(i) == 'u') {
                return true;
            }
        }
        return false;
    }

    static boolean checkConsonant(String s) {
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) != 'a' && s.charAt(i) != 'e' && s.charAt(i) != 'i' && s.charAt(i) != 'o'
                    && s.charAt(i) != 'u') {
                count++;
            }
            if (count >= 2) {
                return true;
            }
        }
        return false;
    }
}
