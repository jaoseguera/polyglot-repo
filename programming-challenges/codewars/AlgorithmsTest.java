package com.codewars.challenges;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;

public class AlgorithmsTest {
    @Test
    public void countSmileysTest() {
        List<String> a = new ArrayList<String>();
        a.add(":)");
        a.add("XD");
        a.add(":0}");
        a.add("x:-");
        a.add("):-");
        a.add("D:");
        assertEquals(1, Algorithms.countSmileys(a));
    }
    @Test
    public void tenMinWalkIsValidTest() {
        assertTrue(Algorithms.tenMinWalkIsValid(new char[] { 'n', 's', 'n', 's', 'n', 's', 'n', 's', 'n', 's' }));
        assertFalse(Algorithms.tenMinWalkIsValid(new char[] { 'w', 'e', 'w', 'e', 'w', 'e', 'w', 'e', 'w', 'e', 'w', 'e' }));
        assertFalse(Algorithms.tenMinWalkIsValid(new char[] { 'w' }));
        assertFalse(Algorithms.tenMinWalkIsValid(new char[] { 'n', 'n', 'n', 's', 'n', 's', 'n', 's', 'n', 's' }));
    }
    @Test
    public void feastTest() {
        assertTrue(Algorithms.feast("great blue heron", "garlic nann"));
        assertTrue(Algorithms.feast("chickadee", "chocolate cake"));
        assertFalse(Algorithms.feast("brown bear", "bear claw"));
    }
    @Test
    public void makeReadableTest() {
        assertEquals("00:00:05", Algorithms.makeReadable(5));
        assertEquals("00:01:00", Algorithms.makeReadable(60));
        assertEquals("00:00:00", Algorithms.makeReadable(0));
        assertEquals("23:59:59", Algorithms.makeReadable(86399));
        assertEquals("99:59:59", Algorithms.makeReadable(359999));
    }
    @Test
    public void thirtTest() {
        System.out.println("Fixed Tests: thirt");
        assertEquals(87, Algorithms.thirt(1234567));
        assertEquals(79, Algorithms.thirt(8529));
        assertEquals(31, Algorithms.thirt(85299258));
        assertEquals(57, Algorithms.thirt(5634));
        assertEquals(71, Algorithms.thirt(1111111111));
        assertEquals(30, Algorithms.thirt(987654321));
    }
    @Test
    public void WhoIsNextTest() {
        String[] names = new String[] { "Sheldon", "Leonard", "Penny", "Rajesh", "Howard" };
        int n = 6;
        assertEquals("Sheldon", Algorithms.WhoIsNextOptimized(names, n));
    }
    // @Test
    // public void sockMechantTest() {
    // int [] array = {10, 20, 20, 10, 10, 30, 50, 10, 20};
    // assertEquals(87, Algorithms.sockMechant(9, array));
    // }
}
