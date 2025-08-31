package CodeVac513;

import java.io.*;
import java.util.Arrays;
import java.util.StringTokenizer;

public class P2473 {
    static long result = Long.MAX_VALUE;
    static long[] answer = new long[3];

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int N = Integer.parseInt(br.readLine());
        long[] nums = new long[N];
        StringTokenizer st = new StringTokenizer(br.readLine());

        for (int i = 0; i < N; i++) {
            nums[i] = Long.parseLong(st.nextToken());
        }

        Arrays.sort(nums);

        solve(nums, N);
        bw.write(answer[0] + " " + answer[1] + " " + answer[2]);

        bw.flush();
        br.close();
        bw.close();
    }

    public static void solve(long[] nums, int N) {
        for (int i = 0; i < N - 2; i++) {
            int start = i;
            int mid = i + 1;
            int end = N - 1;
            while (mid < end) {
                long sum = nums[start] + nums[mid] + nums[end];

                if (Math.abs(sum) < result) {
                    result = Math.abs(sum);
                    answer[0] = nums[start];
                    answer[1] = nums[mid];
                    answer[2] = nums[end];
                }

                if (sum == 0) {
                    answer[0] = nums[start];
                    answer[1] = nums[mid];
                    answer[2] = nums[end];
                    return;
                } else if (sum> 0) {
                    end--;
                } else {
                    mid++;
                }
            }
        }
    }
}

//package CodeVac513;
//
//import java.io.*;
//import java.math.BigInteger;
//import java.util.Arrays;
//import java.util.StringTokenizer;
//
//public class P2473 {
//    static BigInteger result = new BigInteger("1000000001");
//    static BigInteger[] answer = new BigInteger[3];
//
//    public static void main(String[] args) throws IOException {
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
//        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
//        int N = Integer.parseInt(br.readLine());
//        BigInteger[] nums = new BigInteger[N];
//        StringTokenizer st = new StringTokenizer(br.readLine());
//
//        for (int i = 0; i < N; i++) {
//            nums[i] = new BigInteger(st.nextToken());
//        }
//
//        Arrays.sort(nums);
//
//        solve(nums, N);
//        bw.write(answer[0].toString() + " " + answer[1].toString() + " " + answer[2].toString());
//
//        bw.flush();
//        br.close();
//        bw.close();
//    }
//
//    public static void solve(BigInteger[] nums, int N) {
//        for (int i = 0; i < N - 2; i++) {
//            int start = i;
//            int mid = i + 1;
//            int end = N - 1;
//            while (mid < end) {
//                BigInteger sum = nums[start].add(nums[mid]).add(nums[end]);
//
//                if (sum.abs().compareTo(result) < 0) {
//                    result = sum.abs();
//                    answer[0] = nums[start];
//                    answer[1] = nums[mid];
//                    answer[2] = nums[end];
//                }
//
//                if (sum.abs().compareTo(BigInteger.ZERO) == 0) {
//                    answer[0] = nums[start];
//                    answer[1] = nums[mid];
//                    answer[2] = nums[end];
//                    return;
//                } else if (sum.compareTo(BigInteger.ZERO) > 0) {
//                    end--;
//                } else {
//                    mid++;
//                }
//            }
//        }
//    }
//}


//package CodeVac513;
//
//import java.io.*;
//import java.math.BigInteger;
//import java.util.Arrays;
//import java.util.StringTokenizer;
//
//public class P2473 {
//    static BigInteger result = new BigInteger("1000000001");
//    static BigInteger[] answer = new BigInteger[3];
//
//    public static void main(String[] args) throws IOException {
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
//        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
//        int N = Integer.parseInt(br.readLine());
//        BigInteger[] nums = new BigInteger[N];
//        StringTokenizer st = new StringTokenizer(br.readLine());
//
//        for (int i = 0; i < N; i++) {
//            nums[i] = new BigInteger(st.nextToken());
//        }
//
//        Arrays.sort(nums);
//
//        solve(nums, N);
//
//        bw.write(result.toString() + "\n");
//        bw.write(answer[0].toString() + " " + answer[1].toString() + " " + answer[2].toString());
//
//        bw.flush();
//        br.close();
//        bw.close();
//    }
//
//    public static void solve(BigInteger[] nums, int N) {
//
//        for (int i = 0; i < N - 2; i++) {
//            for (int j = i + 1; j < N - 1; j++) {
//                for (int k = j + 1; k < N; k++) {
//                    BigInteger sum = nums[i].add(nums[j]).add(nums[k]);
//                    if (sum.abs().compareTo(result.abs()) < 0) {
//                        result = sum;
//                        answer[0] = nums[i];
//                        answer[1] = nums[j];
//                        answer[2] = nums[k];
//                    }
//
//                    if (sum.compareTo(BigInteger.ZERO) == 0) {
//                        result = sum;
//                        answer[0] = nums[i];
//                        answer[1] = nums[j];
//                        answer[2] = nums[k];
//                        return;
//                    }
//                }
//            }
//        }
//    }
//}
