package cc.mrbird.febs.system.domain;

import cc.mrbird.febs.common.converter.TimeConverter;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.wuwenze.poi.annotation.Excel;
import com.wuwenze.poi.annotation.ExcelField;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;
@Data
@TableName("t_pet")
@Excel("宠物表")
public class Pet implements Serializable {
    private static final long serialVersionUID = -7790334862410409053L;
    @TableId(value = "petId", type = IdType.AUTO)
    private Long petId;

    @TableField("petName")
    @NotBlank(message = "{required}")
    @Size(max = 20, message = "{noMoreThan}")
    @ExcelField(value = "宠物昵称")
    private String petName;

    @TableField("petBreed")
    @NotBlank(message = "{required}")
    @Size(max = 20, message = "{noMoreThan}")
    @ExcelField(value = "宠物类型")
    private String petBreed;

    @TableField("petSex")
    @NotBlank(message = "{required}")
    @ExcelField(value = "宠物性别")
    private String petSex;


    @ExcelField(value = "出生日期")
    private String birthday;


    @ExcelField(value = "宠物描述")
    private String description;

    @TableField("petCreateTime")
    @ExcelField(value = "创建时间")
    private String petCreateTime;

    @TableField("petModifyTime")
    @ExcelField(value = "修改时间")
    private String petModifyTime;
}
