package org.boxproject.controllers;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import org.boxproject.models.Box;
import org.boxproject.models.BoxItem;
import org.boxproject.models.data.BoxRepository;
import org.boxproject.models.dto.QRCodeDTO;
import org.boxproject.security.BoxUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/qrcode")
public class QRCodeController {
    private static final String CHARSET = "UTF-8";

    @Autowired
    private BoxUserService boxUserService;

    @Autowired
    private BoxRepository boxRepository;

    @GetMapping("{boxId}")
    public QRCodeDTO qrCodeBase64(@PathVariable Long boxId) throws Exception {
        // TODO:
        // in the future this would contain either:
        // A) a URL that would take the user to view their box on a hosted project page
        // B) unique ID of the box for an app to read and display the items with an API request
        // since we are not hosting the project and it's not a phone app yet...
        // let's simply list the items within the box
        StringBuilder bldr = new StringBuilder();

        Optional<Box> box = boxRepository.findById(boxId);
        if (box.isPresent()) {
            bldr.append("ID: ").append(box.get().getId()).append("\n");
            bldr.append("Name: ").append(box.get().getLabelName()).append("\n");
            List<BoxItem> items = box.get().getBoxItems();
            if (items.size() > 0) {
                for(BoxItem item : box.get().getBoxItems()) {
                    bldr.append(item.getItemName()).append("\n");
                }
            }
        }

        // generate the qr code
        BitMatrix matrix = new MultiFormatWriter().encode(new String(bldr.toString().getBytes(CHARSET), CHARSET), BarcodeFormat.QR_CODE, 250, 250);
        BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(matrix);

        // write the buffered image to png format in-memory
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        ImageIO.write(bufferedImage, "png", output);

        // encode the image to base64
        Base64.Encoder encoder = Base64.getEncoder();
        String str = encoder.encodeToString(output.toByteArray());

        return new QRCodeDTO(str);
    }
}
