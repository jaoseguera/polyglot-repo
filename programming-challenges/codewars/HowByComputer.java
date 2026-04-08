package com.codewars.challenges;

public class HowByComputer{
    public static int greatestCommonDivisor(int n, int m) {
        if (m == 0)
            return n;

        return greatestCommonDivisor(m, n % m);
    }

    public static int reverseInt(int n) {
        int reversed = 0;
        while (n != 0) {
            reversed = reversed * 10 + (n % 10);
            n /= 10;
        }
        return reversed;
    }
}