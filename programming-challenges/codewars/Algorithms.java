package com.codewars.challenges;

import java.util.Arrays;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

public class Algorithms {

    // COUNT THE SMILEY FACES!: https://www.codewars.com/kata/583203e6eb35d7980400002a
    public static int countSmileys(List<String> arr) {
        int counter = 0;
        String pattern = "[:;][-~]?[)D]";

        for(int i=0; i<arr.size();i++){
            if(arr.get(i).matches(pattern))
                counter++;
        }
        return counter;
    }

    public static int countSmileysOptimized(List<String> arr) {
        return (int) arr.stream()
            .filter(e -> e.matches("[:;][-~]?[\\)D]"))
            .count();
    }

    // TAKE A TEN MINUTE WALK: https://www.codewars.com/kata/54da539698b8a2ad76000228
    public static boolean tenMinWalkIsValid(char[] walk) {
        int north = 0, south = 0, east = 0, west = 0;
        if (walk.length == 10) {
            for (int i = 0; i < walk.length; i++) {
                switch (walk[i]) {
                case 'n':
                    north++;
                    break;
                case 's':
                    south++;
                    break;
                case 'e':
                    east++;
                    break;
                case 'w':
                    west++;
                    break;
                }
            }
            if (north == south && east == west)
                return true;
        }
        return false;
    }

    public static boolean tenMinWalkIsValidOptimized(char[] walk) {
        String s = new String(walk);
        return s.chars().filter(p -> p == 'n').count() == s.chars().filter(p -> p == 's').count()
                && s.chars().filter(p -> p == 'e').count() == s.chars().filter(p -> p == 'w').count()
                && s.chars().count() == 10;
    }

    // THE FEAST OF MANY BEASTS: https://www.codewars.com/kata/5aa736a455f906981800360d
    public static boolean feast(String beast, String dish) {
        char lastChar = beast.charAt(beast.length() - 1);
        char firstChar = beast.charAt(0);

        System.out.println(lastChar);

        return dish.charAt(0) == firstChar && dish.charAt(dish.length() - 1) == lastChar;

    }

    public static boolean feastAlternative(String b, String d) {
        return d.startsWith(b.substring(0, 0)) && d.endsWith(b.substring(b.length() - 1));
    }

    // TWO FIGHTERS, ONE WINNER:
    // https://www.codewars.com/kata/577bd8d4ae2807c64b00045b
    public static String declareWinner(Fighter fighter1, Fighter fighter2, String firstAttacker) {
        Fighter attacker = (fighter1.name.equals(firstAttacker)) ? fighter1 : fighter2;
        Fighter defender = (attacker.equals(fighter2)) ? fighter1 : fighter2;
        Fighter temp = null;

        while (fighter1.health > 0 || fighter2.health > 0) {
            defender.health -= attacker.damagePerAttack;

            temp = defender;
            defender = attacker;
            attacker = temp;
        }

        return temp.name;
    }

    public static String declareWinnerAlternative(Fighter fighter1, Fighter fighter2, String firstAttacker) {
        double attacksToKill1 = Math.ceil((double) fighter2.health / fighter1.damagePerAttack)
                + (fighter1.name.equals(firstAttacker) ? 0 : 1);
        double attacksToKill2 = Math.ceil((double) fighter1.health / fighter2.damagePerAttack);

        return attacksToKill1 <= attacksToKill2 ? fighter1.name : fighter2.name;
    }
    // HUMAN READABLE TIME: https://www.codewars.com/kata/52685f7382004e774f0001f7
    public static String makeReadable(int time) {
        if (time == 0)
            return "00:00:00";

        String hours = "00";
        String minutes = "00";
        String seconds = "00";
        int remainder = time % 3600;

        if (time / 3600 != 0) {
            if (time / 3600 < 10)
                hours = "0" + time / 3600;
            else
                hours = String.valueOf(time / 3600);
        }

        if (remainder / 60 != 0) {
            if (remainder / 60 < 10)
                minutes = "0" + remainder / 60;
            else
                minutes = String.valueOf(remainder / 60);
        }
        remainder = remainder % 60;

        if (remainder != 0) {
            if (remainder < 10)
                seconds = "0" + remainder;
            else
                seconds = String.valueOf(remainder);
        }
        return String.format("%s:%s:%s", hours, minutes, seconds);
    }

    public static String makeReadableOptimized(int seconds) {
        return String.format("%02d:%02d:%02d", seconds / 3600, (seconds / 60) % 60, seconds % 60);
    }

    // A RULE OF DIVISIBILITY BY 13:
    // https://www.codewars.com/kata/564057bc348c7200bd0000ff
    static int[] remainders = { 1, 10, 9, 12, 3, 4 };

    public static long thirt(long n) {
        int index = 0;
        long result = 0;
        long remainder = n;

        while (remainder > 0) {
            long digit = remainder % 10;
            remainder /= 10;
            result += digit * remainders[index];

            if (index == 5)
                index = 0;
            else
                index++;
        }

        if (result == n)
            return n;
        else
            return thirt(result);
    }
    
    // DOUBLE COLA: https://www.codewars.com/kata/551dd1f424b7a4cdae0001f0
    public static String WhoIsNext(String[] names, int n) {
        List<String> list = new LinkedList<String>(Arrays.asList(names));
        String current = "";

        for (int i = 1; i <= n; i++) {
            current = list.get(0);
            list.remove(0);
            list.add(current);
            list.add(current);
        }

        return current;
    }

    public static String WhoIsNextOptimized(String[] names, int n) {
        while (n > 5) {
            n = (n - 4) / 2;
        }

        return names[n - 1];
    }

    // public static int sockMechant(int n, int[] array) {
    // Set<Integer> colors = new HashSet<>();
    // int pairs = 0;

    // for (int i = 0; i < n; i++) {
    // if (!colors.contains(array[i])) {
    // colors.add(array[i]);
    // } else {
    // pairs++;
    // colors.remove(array[i]);
    // }
    // }
    // return pairs;
    // }
}
