package CodeVac513;

import java.io.*;

public class P11720 {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());
        String[] s = br.readLine().split("");
        int sum = 0;
        for(int i = 0 ; i < N ; i++) {
            sum += Integer.parseInt(s[i]);
        }
        bw.write(String.valueOf(sum));
        bw.flush();
        bw.close();
        br.close();
    }
}
