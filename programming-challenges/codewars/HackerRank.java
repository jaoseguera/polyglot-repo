package com.codewars.challenges;

import java.util.Arrays;

public class HackerRank {
    public static int shop(int budget, int[] keyboards, int[] drives) {
        Arrays.sort(keyboards);
        Arrays.sort(drives);
        int max = -1;

        for (int i = keyboards.length - 1; i >= 0; i--) {
            for (int j = 0; j < drives.length; j++) {
                int result = keyboards[i] + drives[j];

                if ( result <= budget && result > max)
                    max = result;
            }
        }
        
        return max;
    }

    public static int birds(int[] population) {
        Arrays.sort(population);
        int counter = 0;
        int counterMax = 0;
        int birdMax = 0;
        int bird = population[0];

        for (int i = 0; i < population.length; i++) {
            if(population[i] == bird)
                counter++;
            else {
                if(counter > counterMax){
                    counterMax = counter;
                    birdMax = bird;
                }
                bird = population[i];
                counter = 1;
            }
        }
        return birdMax;
    }
}