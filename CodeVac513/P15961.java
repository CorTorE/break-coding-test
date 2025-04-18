package CodeVac513;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P15961 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int N = Integer.parseInt(st.nextToken());
        int d = Integer.parseInt(st.nextToken());
        int k = Integer.parseInt(st.nextToken());
        int c = Integer.parseInt(st.nextToken());

        int[] sushiBelt = new int[N];
        for (int i = 0; i < N; i++) {
            sushiBelt[i] = Integer.parseInt(br.readLine());
        }

        ;
        bw.write(String.valueOf(solution(sushiBelt, N, d, k, c)));

        bw.flush();
        bw.close();
        br.close();
    }

    static int solution(int[] sushiBelt, int sushiBeltLength, int totalSushiTypes, int limit,
            int coupon) {
        int[] sushiCount = new int[totalSushiTypes + 1];
        int sushiTypeCount = 0;


        // 처음 범위의 초밥 종류 카운트
        for (int i = 0; i < limit; i++) {
            if (sushiCount[sushiBelt[i]] == 0) {
                sushiTypeCount++;
            }

            sushiCount[sushiBelt[i]]++;
        }

        int maxCount = sushiTypeCount;
        if (sushiCount[coupon] == 0) {
            maxCount++;
        }

        // 슬라이딩 윈도우
        for (int i = 1; i < sushiBeltLength; i++) {
            // 이전 초밥 제거
            sushiCount[sushiBelt[i - 1]]--;
            if (sushiCount[sushiBelt[i - 1]] == 0) {
                sushiTypeCount--;
            }

            // 새로운 초밥 추가
            int newIndex = (i + limit - 1) % sushiBeltLength;
            if (sushiCount[sushiBelt[newIndex]] == 0) {
                sushiTypeCount++;
            }
            sushiCount[sushiBelt[newIndex]]++;

            // 쿠폰 초밥
            int currentCount = sushiTypeCount;
            if (sushiCount[coupon] == 0) {
                currentCount++;
            }

            maxCount = Math.max(maxCount, currentCount);
        }

        return maxCount;

    }

}

// package CodeVac513;

// import java.io.BufferedReader;
// import java.io.BufferedWriter;
// import java.io.IOException;
// import java.io.InputStreamReader;
// import java.io.OutputStreamWriter;
// import java.util.ArrayList;
// import java.util.HashSet;
// import java.util.Set;
// import java.util.StringTokenizer;

// public class P15961 {
// static int ans = 0;

// public static void main(String[] args) throws IOException {
// BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
// BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
// StringTokenizer st = new StringTokenizer(br.readLine());

// int N = Integer.parseInt(st.nextToken());
// int d = Integer.parseInt(st.nextToken());
// int k = Integer.parseInt(st.nextToken());
// int c = Integer.parseInt(st.nextToken());

// ArrayList<Node> sushiBelt = new ArrayList<>();
// for (int i = 0; i < N; i++) {
// if (i < N - 1) {
// sushiBelt.add(new Node(Integer.parseInt(br.readLine()), i + 1));
// } else {
// sushiBelt.add(new Node(Integer.parseInt(br.readLine()), 0));
// }
// }

// solution(sushiBelt, k, c);
// bw.write(String.valueOf(ans));

// bw.flush();
// bw.close();
// br.close();
// }

// static void solution(ArrayList<Node> sushiBelt, int limit, int coupon) {
// for (Node current : sushiBelt) {
// Set<Integer> checkSushiType = new HashSet<>();
// checkSushiType.add(current.sushiType);
// Node nextSushi = current;
// for (int i = 1; i < limit; i++) {
// nextSushi = sushiBelt.get(nextSushi.nextNodeIndex);
// checkSushiType.add(nextSushi.sushiType);
// }
// checkSushiType.add(coupon);
// int result = checkSushiType.size();
// if (ans < result)
// ans = result;
// }
// }

// static class Node {
// int sushiType, nextNodeIndex;

// Node(int sushiType, int nextNodeIndex) {
// this.sushiType = sushiType;
// this.nextNodeIndex = nextNodeIndex;
// }
// }
// }
