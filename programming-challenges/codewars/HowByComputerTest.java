package com.codewars.challenges;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.math.BigInteger;
import java.util.concurrent.ThreadLocalRandom;

import org.junit.jupiter.api.Test;

public class HowByComputerTest {
    @Test
    public void greatestCommonDivisor() {
        int m = ThreadLocalRandom.current().nextInt(0, 1001);
        int n = ThreadLocalRandom.current().nextInt(0, 1001);

        assertEquals(BigInteger.valueOf(m).gcd(BigInteger.valueOf(n)).intValue(), HowByComputer.greatestCommonDivisor(n, m));
    }
}
