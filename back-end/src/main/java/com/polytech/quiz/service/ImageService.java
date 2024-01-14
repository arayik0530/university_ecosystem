package com.polytech.quiz.service;

import java.awt.image.RenderedImage;
import java.io.IOException;

public interface ImageService {
    byte[] resize(byte[] bytes, int width, int height);

    void deleteImage(Long userId);

    byte[] bytesFromImage(RenderedImage image) throws IOException;

    void saveOriginalImage(byte[] imagesBytes, Long userId);

    void saveSmallImage(byte[] imageBytes, Long userId);

    byte[] getStandardImage();

    void setStandardImage(byte[] imgBytes);
}
