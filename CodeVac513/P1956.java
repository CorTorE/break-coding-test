package CodeVac513;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.StringTokenizer;

public class P1956 {
    static int[][] adjacentArray;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int V = Integer.parseInt(st.nextToken());
        int E = Integer.parseInt(st.nextToken());

        adjacentArray = new int[V + 1][V + 1];
        for (int i = 0; i < V + 1; i++) {
            Arrays.fill(adjacentArray[i], Integer.MAX_VALUE);
            adjacentArray[i][i] = 0;
        }

        for (int i = 0; i < E; i++) {
            st = new StringTokenizer(br.readLine());
            int startNode = Integer.parseInt(st.nextToken());
            int endNode = Integer.parseInt(st.nextToken());
            int weight = Integer.parseInt(st.nextToken());

            adjacentArray[startNode][endNode] = weight;
        }

        getShortestPath(V);

        int shortest = Integer.MAX_VALUE;
        for (int i = 1; i < V + 1; i++) {
            for (int j = 1; j < V + 1; j++) {
                if (adjacentArray[i][j] != Integer.MAX_VALUE
                        && adjacentArray[j][i] != Integer.MAX_VALUE && i != j) {
                    int ans = adjacentArray[i][j] + adjacentArray[j][i];
                    if (shortest > ans)
                        shortest = ans;
                }
            }
        }

        if (shortest == Integer.MAX_VALUE)
            shortest = -1;

        bw.write(shortest + "\n");

        bw.flush();
        br.close();
        bw.close();
    }

    public static void getShortestPath(int V) {
        for (int k = 1; k < V + 1; k++) {
            for (int s = 1; s < V + 1; s++) {
                for (int e = 1; e < V + 1; e++) {
                    if (adjacentArray[s][k] != Integer.MAX_VALUE
                            && adjacentArray[k][e] != Integer.MAX_VALUE)
                        adjacentArray[s][e] = Math.min(adjacentArray[s][e],
                                adjacentArray[s][k] + adjacentArray[k][e]);
                }
            }
        }
    }
}
