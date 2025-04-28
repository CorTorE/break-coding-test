package CodeVac513;

import java.io.*;
import java.util.HashMap;

public class P10809 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        String target = br.readLine();

        HashMap<Character, Integer> map = init();
        searchIndex(map, target);

        for(int i = 0; i < 26; i++){
            bw.write(map.get((char)('a' + i))+" ");
        }

        br.close();
        bw.flush();
        bw.close();
    }

    public static HashMap<Character, Integer> init() {
        HashMap<Character, Integer> map = new HashMap<>();
        for (int i = 0; i < 26; i++) {
            map.put((char) ('a' + i), -1);
        }

        return map;
    }

    public static void searchIndex(HashMap<Character, Integer> map, String target) {
        int N = target.length();

        for (int i = 0; i < N; i++) {
            Character c = target.charAt(i);
            if(map.get(c) == -1) {
                map.put(c, i);
            }
        }
    }
}