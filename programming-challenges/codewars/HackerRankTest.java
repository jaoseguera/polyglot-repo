package com.codewars.challenges;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class HackerRankTest {
    @Test
    public void ElectronicShopTest() {
        assertEquals(-1, HackerRank.shop(5, new int[] {4}, new int[] {5}));
        assertEquals(58, HackerRank.shop(60, new int[] {40, 50, 60}, new int[] {5, 8, 12}));
        assertEquals(9, HackerRank.shop(10, new int[] { 3, 1 }, new int[] { 5, 2, 8 }));
    }
    @Test
    public void birdTest() {
        assertEquals(1, HackerRank.birds(new int[] { 1, 1, 2, 2, 3 }));
        assertEquals(4, HackerRank.birds(new int[] { 1, 4, 4, 4, 5, 3 }));
        assertEquals(3, HackerRank.birds(new int[] { 1, 2, 3, 4, 5, 4, 3, 2, 1, 3, 4 }));
    }
}

