package com.example.project_management_class.application.util;

import java.util.Locale;

public final class ClassNameUtils {
    private ClassNameUtils() {}

    /**
     * Normalize a class name to a comparable key (lowercase, no spaces, no leading "class"/"lop" prefixes).
     * Examples:
     * - "10A1" -> "10a1"
     * - "class10A1" -> "10a1"
     * - "Lop 10A1" -> "10a1"
     */
    public static String normalizeToKey(String raw) {
        if (raw == null) return "";
        String s = raw.trim();
        if (s.isEmpty()) return "";

        // Collapse whitespace and lowercase for comparison.
        s = s.replaceAll("\\s+", "");
        s = s.toLowerCase(Locale.ROOT);

        // Strip common prefixes if present.
        if (s.startsWith("class")) s = s.substring("class".length());
        if (s.startsWith("lop")) s = s.substring("lop".length());

        // If still starts with non-digit characters, drop until a digit to support inputs like "lop10a1".
        int i = 0;
        while (i < s.length() && !Character.isDigit(s.charAt(i))) {
            i++;
        }
        if (i > 0 && i < s.length()) {
            s = s.substring(i);
        }
        return s;
    }

    public static Integer parseGradeLevel(String classKey) {
        if (classKey == null) return null;
        String s = classKey.trim();
        if (s.isEmpty()) return null;

        int i = 0;
        while (i < s.length() && Character.isDigit(s.charAt(i))) {
            i++;
        }
        if (i == 0) return null;
        try {
            return Integer.parseInt(s.substring(0, i));
        } catch (NumberFormatException e) {
            return null;
        }
    }

    public static String parseClassSimpleName(String classKey) {
        if (classKey == null) return "";
        String s = classKey.trim();
        if (s.isEmpty()) return "";
        int i = 0;
        while (i < s.length() && Character.isDigit(s.charAt(i))) {
            i++;
        }
        if (i >= s.length()) return "";
        return s.substring(i);
    }
}

